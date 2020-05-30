import { workerData,parentPort } from 'worker_threads';
import { Helpers } from "./Helpers";
import { create, all, bignumber } from 'mathjs';
import BitSet from 'bitset';
import Jimp from "jimp";


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
              
        let red = image.bitmap.data[idx + 0];
        let green = image.bitmap.data[idx + 1];
        let blue = image.bitmap.data[idx + 2];
        let alpha = image.bitmap.data[idx + 3];
        
        let binPixel = Helpers.rgba2Bin(red, green , blue , alpha);

        let lsb = Helpers.getLSB(next , 32);

        let xorRes = lsb.xor(binPixel);

        let encryptedPixelBinary = xorRes.xor(prevPixelBinary);

        prevPixelBinary = encryptedPixelBinary;

        let encRgba = Helpers.bin2Rgba(encryptedPixelBinary);
        
        image.bitmap.data[idx + 0] = encRgba[0];
        image.bitmap.data[idx + 1] = encRgba[1];
        image.bitmap.data[idx + 2] = encRgba[2];
        image.bitmap.data[idx + 3] = encRgba[3];   

        parentPort.postMessage( { progress :  (( index / numPixels ) * 100)} )
        index++;
                             

    });

    console.log(scope.x);
    image.write( workerData.outputPath + "\\out.png");
});
        