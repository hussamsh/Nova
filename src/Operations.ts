

import { Helpers } from "./helpers/Helpers";
import { bignumber } from 'mathjs';
import BitSet from 'bitset';
import Jimp from "jimp";
import Maps from './maps/Maps';
import { Events } from "./helpers/Enums";


export abstract class Operation {

    //Pixel to which optimize the width / height
    optimizeValue = 550;

    //Equation of current encryption algorithm
    equation;
    //Current parameters of the given equation
    scope;

    algorithm;
    operation;
    parameters;
    imagePath;
    optimize;
    outputPath;

    //Callbacks
    initializingCallback;
    readingImageCallback;
    resizingImageCallback;
    progressCallback;
    failedCallback;
    finishedCallback;

    constructor(algorithm , parameters , optimize, imagePath , outputPath ){
        this.algorithm = algorithm;
        this.parameters = parameters;
        this.optimize = optimize;
        this.imagePath = imagePath;
        this.outputPath = outputPath;
    }

    start(){

        if(this.initializingCallback) { this.initializingCallback() }

        switch(this.algorithm){
            case Maps.DH.getName():
                this.equation = "r * ( (x - c) ^ 2) * ( c^2 - ((x - c) ^ 2) )";
                this.scope = {
                    r : bignumber(this.parameters['Growth rate']),
                    x : bignumber(this.parameters['Initial condition']),
                    c : bignumber(this.parameters['Generalization parameter']),
                };
                break;
            case Maps.Logistic.getName():
                this.equation = "r * x * ( 1 - x )";
                this.scope = {
                    x : bignumber(this.parameters['Initial condition']),
                    r : bignumber(this.parameters['Growth rate']),
                };
                break;
            case Maps.Henon.getName():
                this.scope = {
                    x : bignumber(this.parameters['x']),
                    y : bignumber(this.parameters['y']),
                    // a : bignumber(workerData.parameters['alpha']),
                    // b : bignumber(workerData.parameters['beta']),
                }
                break;
        }


        if(this.readingImageCallback) { this.readingImageCallback() }

        Jimp.read(this.imagePath , (err , image) => {

            if(err) throw err;
    
            
            if (this.optimize && (image.bitmap.width > this.optimizeValue || image.bitmap.height > this.optimizeValue)){
                if(this.resizingImageCallback) { this.resizingImageCallback() }
                image.bitmap.width > image.bitmap.height ? image.resize(this.optimizeValue , Jimp.AUTO) : image.resize(Jimp.AUTO, this.optimizeValue);
            }
    
            /*
                Progress calcuation
                First - Compute the number of pixels in an image
                Second - Set a variable index to know how many pixels are left for decrypting
            */
            let numPixels = image.bitmap.width * image.bitmap.height;
            let index = 0;

            //After reading the image, scan it's pixels
            image.scan(0 , 0 , image.bitmap.width , image.bitmap.height , (x ,y ,idx) => {

                // console.log("next iteration");
                //Evaluate next iteration of the map
                let next = this.nextIterationValue();
                
                //Update initial condition
                this.scope.x = next;

                //Extract RGBA values of the current pixel
                let red = image.bitmap.data[idx + 0];
                let green = image.bitmap.data[idx + 1];
                let blue = image.bitmap.data[idx + 2];
                let alpha = image.bitmap.data[idx + 3];

                let pixel = this.nextPixel(new Pixel(red, green , blue , alpha) , next.toNumber());

                //Set the new pixel value 
                image.bitmap.data[idx + 0] = pixel.r;
                image.bitmap.data[idx + 1] = pixel.g;
                image.bitmap.data[idx + 2] = pixel.b;
                image.bitmap.data[idx + 3] = pixel.a;   

                //Update the main thread with the progress
                if( this.progressCallback ) { this.progressCallback("Progress " + Math.floor((( index++ / numPixels ) * 100)) + " %") }
            });
            
            //When finished , write the new image data to the output path
            image.write(this.outputPath , () => {
                if(this.finishedCallback()) { this.finishedCallback() }
            });
    
        });

    }


    setCallback( id : Events , callback){
        switch(id){
            case Events.INITIALIZATING:
                this.initializingCallback = callback;
                break;
            case Events.READ_IMAGE:
                this.readingImageCallback = callback;
                break;
            case Events.RESIZING_IMAGE:
                this.resizingImageCallback = callback;
                break;
            case Events.PROGRESS:
                this.progressCallback = callback;
                break;
            case Events.FAILED:
                this.failedCallback = callback;
                break;
            case Events.FINISHED :
                this.finishedCallback = callback;
                break;
        }
    }


    abstract nextPixel(pixel : Pixel, currValue : number) : Pixel;

    private nextIterationValue(){

        if(this.algorithm == Maps.Henon.getName()) {
       
            this.equation = "1 - (1.4 * (x^2)) + y";
    
            let result = Helpers.math.evaluate(this.equation , this.scope);
    
            this.scope.y = Helpers.math.evaluate("0.3 * x" , this.scope);
    
            if(!result.isFinite()){                
                if(this.failedCallback){
                    this.failedCallback("Henon reached infinity");
                }else{
                    throw new Error("Henon reached infinity and no failure callback is set");
                }
            }
    
            return result;
        }
    
        return Helpers.math.evaluate(this.equation , this.scope);
    }



    
}


export class EncryptionOperation extends Operation {

    //Create an empty Bitset which representes the previous pixel , initially is set to (0)
    prevPixelBinary = new BitSet(0);
    
    nextPixel(pixel: Pixel, currValue: number): Pixel {
        
        //Convert to FP and Get the 32 LSB 
        let lsb = Helpers.getLSB(currValue , 32);

        //Convert RGBA to binary
        let binPixel = Helpers.rgba2Bin(pixel.r, pixel.g , pixel.b , pixel.a);

        //First Xor operation
        let xorRes = lsb.xor(binPixel);

        //Second Xor operation
        let encryptedPixelBinary = xorRes.xor(this.prevPixelBinary);

        //Update previous pixel value
        this.prevPixelBinary = encryptedPixelBinary;

        //Convert result back to RGBA
        let encRgba = Helpers.bin2Rgba(encryptedPixelBinary);

        return new Pixel(encRgba[0] , encRgba[1] , encRgba[2] , encRgba[3]);
    } 

}

export class DecryptionOperation extends Operation {

     //Create an empty Bitset which representes the previous pixel , initially is set to (0)
     prevPixelBinary = new BitSet(0);

    nextPixel(pixel: Pixel, currValue: number): Pixel {

        //Convert to FP and Get the 32 LSB 
        let lsb = Helpers.getLSB(currValue , 32);

        //Convert RGBA to binary
        let encryptedPixelBinary = Helpers.rgba2Bin(pixel.r, pixel.g , pixel.b , pixel.a);

        //First Xor operation
        let xorRes = lsb.xor(encryptedPixelBinary);
        
        //Second Xor operation
        let binPixel = xorRes.xor(this.prevPixelBinary);

        //Update previous pixel value
        this.prevPixelBinary = encryptedPixelBinary;

        //Convert result back to RGBA
        let origRgba = Helpers.bin2Rgba(binPixel);
        
        return new Pixel(origRgba[0] , origRgba[1] , origRgba[2] , origRgba[3]);

    }

}


class Pixel {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r,g,b,a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}