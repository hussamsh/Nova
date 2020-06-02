import BitSet from "bitset";
import Jimp from "jimp/*";
var toFP = require( 'math-float64-to-binary-string' );
var resemble = require('node-resemble-js');
import { create, all } from 'mathjs';


export class Helpers {

        //mathjs configuration - use BigNumbers of precsion 64 bits
    private static readonly config = {
        number : 'BigNumber',
        precision : 64
    }

    //Create mathjs object
    static readonly math = create(all , Helpers.config);

    /** 
        Get the LSB - Least significant bit - of a given number. Since input will be converted to FP
        The maximum Size of LSB must be 52 - which is the entire mantissa
        @param input Number which will be converted
        @param x Size of the LSB (<= 52)
    */
    static getLSB(input : number , x : number) : BitSet {

        if(x > 52){
            throw new Error("LSB cannot be larger than 52 bits");
        }

        //Convert the given number to IEEE754 double precision floating point representation (64 bits) 
        let fp : string = toFP(input);
        
        //Get the LSB of the FP up to (x) places
        let lsb = fp.substr(fp.length - x);

        return new BitSet(lsb);
    }


    /**
     * Converts RGBA color to it's binary representation
     * @returns 32 bit Bitset (4 * 8bits) of the color after conversion in the same order R- G - B - A
     */
    static rgba2Bin(red : number , green : number , blue : number , alpha : number) : BitSet{

        let result = "";

        //Concat each color binary representation 
        result += this.dec2bin(red)
        result += this.dec2bin(green)
        result += this.dec2bin(blue)
        result += this.dec2bin(alpha)

        //Create a new bitset of the result
        return new BitSet(result.padStart(32 , '0'));
    }

    /**
     * Converts a bin representation of an RGBA color to it's integer representation
     * @param bin A 32 bit bitset which contains the color values in 8 bit increments in order of R - G - B - A
     * @returns An array containing the integer values for the RGBA
     */
    static bin2Rgba(bin : BitSet) : Array<number> {

        //Split the bitset to 8 chuncks
        let split = bin.toString().padStart(32 , '0').split(/(.{8})/).filter(O=>O)
        
        //Convert each color back to integer
        let red = parseInt(split[0] , 2);
        let green =  parseInt(split[1] , 2);
        let blue =  parseInt(split[2] , 2);
        let alpha =  parseInt(split[3] , 2); 

        // Return values
        return [red , green, blue , alpha];
    }


    /**
     * Convert a decimal number to binary
     */
    static dec2bin(dec) : string{
        return (dec >>> 0).toString(2).padStart(8, '0');;
    }

}