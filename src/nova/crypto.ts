
// import { parentPort } from 'worker_threads';
import { ipcRenderer } from "electron";
import { Helpers } from "./Helpers";
import { bignumber } from 'mathjs';
import BitSet from 'bitset';
import Jimp from "jimp";
import EncryptionTypes from './EncryptionTypes';

//Equation of current encryption algorithm
let equation;
//Current parameters of the given equation
let scope;
//Pixel to which optimize the width / height
const optimizeValue = 550;

let algorithm;

//Image to be processed
let image;

//Create an empty Bitset which representes the previous pixel , initially is set to (0)
let prevPixelBinary = new BitSet(0);

/*
    Progress calcuation
    First - Compute the number of pixels in an image
    Second - Set a variable index to know how many pixels are left for decrypting
*/
let numPixels;
let index = 0;

ipcRenderer.on('crypto' , (event , input) => {

    algorithm = input.algorithm;

    //Selects the encryption algorithm which set the equation and the scope
    switch(algorithm){
    case EncryptionTypes.DH.getName():
        equation = "r * ( (x - c) ^ 2) * ( c^2 - ((x - c) ^ 2) )";
        scope = {
            r : bignumber(input.parameters['Growth rate']),
            x : bignumber(input.parameters['Initial condition']),
            c : bignumber(input.parameters['Generalization parameter']),
        };
        break;
    case EncryptionTypes.Logistic.getName():
        equation = "r * x * ( 1 - x )";
        scope = {
            x : bignumber(input.parameters['Initial condition']),
            r : bignumber(input.parameters['Growth rate']),
        };
        break;
    case EncryptionTypes.Henon.getName():
        scope = {
            x : bignumber(input.parameters['x']),
            y : bignumber(input.parameters['y']),
            // a : bignumber(workerData.parameters['alpha']),
            // b : bignumber(workerData.parameters['beta']),
        }
        break;
    }

    ipcRenderer.send("progress" , "Reading Image Data")

    Jimp.read(input.imagePath , (err , data) => {

        if(err) throw err;

        image = data;
        
        if (input.optimize && (image.bitmap.width > optimizeValue || image.bitmap.height > optimizeValue)){
            image.bitmap.width > image.bitmap.height ? image.resize(optimizeValue , Jimp.AUTO) : image.resize(Jimp.AUTO, optimizeValue);
        }

        numPixels = image.bitmap.width * image.bitmap.height;

        if(input.operation == 'encrypt'){
            encrypt();
        }else if(input.operation == 'decrypt'){
            decrypt();
        }

        //Get filename
        let filename = input.imagePath.replace(/^.*[\\\/]/, '').split('.');

        //File name without extension, if it has (_encrypted , _decrypted) remove them to avoid unnecessary long file name
        let name = filename[0].replace("_encrypted" , "");
        name = name.replace("_decrypted" , "");

        //Add _encrypted to the original file name -- For now always write to png files instead of original extension as this solves the problem of pixel information loss on resize.
        // let outputName = workerData.outputFolder + "/" + name + "_encrypted." + filename[1]; 
        let postfix = (input.operation == 'encrypt') ? "_encrypted.png" : "_decrypted.png";

        let outputName = input.outputFolder + "/" + name + postfix; 
        
        //When finished , write the new image data to the output path
        image.write(outputName , () => {
            ipcRenderer.send('image-written');
        });

    });

});


function encrypt(){
    //After reading the image, scan it's pixels
    image.scan(0 , 0 , image.bitmap.width , image.bitmap.height , (x ,y ,idx) => {

        // console.log("next iteration");
        //Evaluate next iteration of the map
        let next = nextIteration();
        
        //Update initial condition
        scope.x = next;

        //Convert to FP and Get the 32 LSB 
        let lsb = Helpers.getLSB(next.toNumber() , 32);

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
        ipcRenderer.send('progress' , "PROGRESS " + Math.floor((( index++ / numPixels ) * 100)) + " %" );

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
        return;

    });
}

function decrypt(){
    //After reading the image, scan it's pixels
    image.scan(0 , 0 , image.bitmap.width , image.bitmap.height , (x ,y ,idx) => {

        //Evaluate next iteration of the map
        let next = nextIteration();

        //Update initial condition
        scope.x = next;
                
        // console.log(index + " : " + next);
        //Convert to FP and Get the 32 LSB 
        let lsb = Helpers.getLSB(next.toNumber() , 32);

        //Extract RGBA values of the current pixel
        let red = image.bitmap.data[idx + 0];
        let green = image.bitmap.data[idx + 1];
        let blue = image.bitmap.data[idx + 2];
        let alpha = image.bitmap.data[idx + 3];
        
        //Convert RGBA to binary
        let encryptedPixelBinary = Helpers.rgba2Bin(red, green , blue , alpha);

        //First Xor operation
        let xorRes = lsb.xor(encryptedPixelBinary);
        
        //Second Xor operation
        let binPixel = xorRes.xor(prevPixelBinary);

        //Convert result back to RGBA
        let origRgba = Helpers.bin2Rgba(binPixel);
        
        //Set the new pixel value 
        image.bitmap.data[idx + 0] = origRgba[0];
        image.bitmap.data[idx + 1] = origRgba[1];
        image.bitmap.data[idx + 2] = origRgba[2];
        image.bitmap.data[idx + 3] = origRgba[3];   

        //Update the main thread with the progress
        ipcRenderer.send('progress' , "PROGRESS " + Math.floor((( index++ / numPixels ) * 100)) + " %" );
        
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
}
        
function nextIteration() {

    if(algorithm == EncryptionTypes.Henon.getName()) {
       
        equation = "1 - (1.4 * (x^2)) + y";

        let result = Helpers.math.evaluate(equation , scope);

        scope.y = Helpers.math.evaluate("0.3 * x" , scope);

        if(!result.isFinite()){
            ipcRenderer.sendSync('invalid-henon');
        }

        return result;
    }

    return Helpers.math.evaluate(equation , scope);
}