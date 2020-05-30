import { workerData,parentPort } from 'worker_threads';
import { Helpers } from "./Helpers";
import { create, all, bignumber } from 'mathjs';
import BitSet from 'bitset';
import Jimp from "jimp";


console.log(workerData.inputPath);

Jimp.read(workerData.inputPath.substring(8 , workerData.inputPath.length), (err , image) => {
    if(err) throw err;

    const config = {
        number : 'BigNumber',
        precision : 64
    }
    
    const math = create(all , config);
    
    let equation = "r * ((x - c) ^ 2) * ( c^2 - ((x - c) ^ 2) )";
    
    const scope = {
        r : bignumber(workerData.growthRate),
        c : bignumber(workerData.generalizationParam),
        x : bignumber(workerData.initialCondition)
    };

    let prevPixelBinary = new BitSet(0);
    let numPixels = image.bitmap.width * image.bitmap.height;
    let index = 0

    image.scan(0 , 0 , image.bitmap.width , image.bitmap.height , (x ,y ,idx) => {
                
        let next = math.evaluate(equation , scope)
        scope.x = next;
                
        let lsb = Helpers.getLSB(next , 32);

        let red = image.bitmap.data[idx + 0];
        let green = image.bitmap.data[idx + 1];
        let blue = image.bitmap.data[idx + 2];
        let alpha = image.bitmap.data[idx + 3];
        
        let encryptedPixelBinary = Helpers.rgba2Bin(red, green , blue , alpha);

        let xorRes = lsb.xor(encryptedPixelBinary);
        
        let binPixel = xorRes.xor(prevPixelBinary);

        let origRgba = Helpers.bin2Rgba(binPixel);
        
        image.bitmap.data[idx + 0] = origRgba[0];
        image.bitmap.data[idx + 1] = origRgba[1];
        image.bitmap.data[idx + 2] = origRgba[2];
        image.bitmap.data[idx + 3] = origRgba[3];   

        parentPort.postMessage( { progress :  (( index / numPixels ) * 100)} )
        index++;

        if(false){
            console.log("LSB : " + lsb.toString().padStart(32 , '0'));
            console.log("Cip : " + encryptedPixelBinary.toString().padStart(32 , '0'));
            console.log("Xor : " + xorRes.toString().padStart(32 , '0'));
            console.log("Prv : " + prevPixelBinary.toString().padStart(32 , '0'));
            console.log("Bin : " +  binPixel.toString().padStart(32 , '0'));
            console.log("---------------------------------------------")
        }

        prevPixelBinary = encryptedPixelBinary;
                

    });

    console.log(scope.x);
    image.write( workerData.outputPath + "\\orig.png");
});
        