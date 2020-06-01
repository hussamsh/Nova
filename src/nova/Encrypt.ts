import { workerData,parentPort } from 'worker_threads';
import { Helpers } from "./Helpers";
import { create, all, bignumber } from 'mathjs';
import BitSet from 'bitset';
import Jimp from "jimp";
import EncryptionTypes from './EncryptionTypes';
const fs = require("fs");

//mathjs configuration - use BigNumbers of precsion 64 bits
const config = {
    number : 'BigNumber',
    precision : 64
}

//Create mathjs object
const math = create(all , config);

//Equation of current encryption algorithm
let equation;
//Current parameters of the given equation
let scope;

//Selects the encryption algorithm which set the equation and the scope
switch(workerData.algorithm){
    case EncryptionTypes.DH.getName():
        equation = "r * ((x - c) ^ 2) * ( c^2 - ((x - c) ^ 2) )";
        scope = {
            r : bignumber(workerData.parameters['Growth rate']),
            x : bignumber(workerData.parameters['Inital condition']),
            c : bignumber(workerData.parameters['Generalization parameter']),
        };
        break;
    case EncryptionTypes.Logistic.getName():
        equation = "r * x * ( 1 - x )";
        scope = {
            x : bignumber(workerData.parameters['Inital condition']),
            r : bignumber(workerData.parameters['Growth rate']),
        };
        break;
}

//TODO : check if file path is still valid

//Read image data from the input path
Jimp.read(workerData.inputPath.replace("file:///" , ""), (err , image) => {
  
    if(err) throw err;

    //Create an empty Bitset which representes the previous pixel , initially is set to (0)
    let prevPixelBinary = new BitSet(0);

    /*
        Progress calcuation
        First - Compute the number of pixels in an image
        Second - Set a variable index to know how many pixels are left for decrypting
    */
    let numPixels = image.bitmap.width * image.bitmap.height;
    let index = 0;

    //After reading the image, scan it's pixels
    image.scan(0 , 0 , image.bitmap.width , image.bitmap.height , (x ,y ,idx) => {
                
        //Evaluate next iteration of the map
        let next = math.evaluate(equation , scope)
        
        //Update initial condition
        scope.x = next;
           
        //Convert to FP and Get the 32 LSB 
        let lsb = Helpers.getLSB(next , 32);

        //Extract RGBA values of the current pixel
        let red = image.bitmap.data[idx + 0];
        let green = image.bitmap.data[idx + 1];
        let blue = image.bitmap.data[idx + 2];
        let alpha = image.bitmap.data[idx + 3];
        
        //Convert RGBA to binary
        let binPixel = Helpers.rgba2Bin(red, green , blue , alpha);

        //First Xor operation
        let xorRes = lsb.xor(binPixel);

        //Second Xor operation
        let encryptedPixelBinary = xorRes.xor(prevPixelBinary);

        //Convert result back to RGBA
        let encRgba = Helpers.bin2Rgba(encryptedPixelBinary);
        
        //Set the new pixel value 
        image.bitmap.data[idx + 0] = encRgba[0];
        image.bitmap.data[idx + 1] = encRgba[1];
        image.bitmap.data[idx + 2] = encRgba[2];
        image.bitmap.data[idx + 3] = encRgba[3];   

        //Update the main thread with the progress
        parentPort.postMessage( { progress :  (( index++ / numPixels ) * 100)} )

         //Logging
         if(false){
            console.log("LSB : " + lsb.toString().padStart(32 , '0'));
            console.log("Cip : " + encryptedPixelBinary.toString().padStart(32 , '0'));
            console.log("Xor : " + xorRes.toString().padStart(32 , '0'));
            console.log("Prv : " + prevPixelBinary.toString().padStart(32 , '0'));
            console.log("Bin : " +  binPixel.toString().padStart(32 , '0'));
            console.log("---------------------------------------------")
        }
         
        //Update the previous pixel value
        prevPixelBinary = encryptedPixelBinary;

    });

    //Get filename
    let filename = workerData.inputPath.replace(/^.*[\\\/]/, '').split('.');

    //File name without extension, if it has (_encrypted , _decrypted) remove them to avoid unnecessary long file name
    let name = filename[0].replace("_encrypted" , "");
    name = name.replace("_decrypted" , "");

    //Add _encrypted to the original file name 
    let outputName = workerData.outputFolder + "\\" + name + "_encrypted." + filename[1]; 
    
    //When finished , write the new image data to the output path
    image.write(outputName);
});
        