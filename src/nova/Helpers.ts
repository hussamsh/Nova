import BitSet from "bitset";
var toFP = require( 'math-float64-to-binary-string' );

export class Helpers {

    static getLSB(input : number , x : number) : BitSet {

        let fp : string = toFP(input);
        let lsb = fp.substr(fp.length - x);

        return new BitSet(lsb);
    }


    static rgba2Bin(red : number , green : number , blue : number , alpha : number) : BitSet{

        let result = "";

        result += this.dec2bin(red).padStart(8, '0');
        result += this.dec2bin(green).padStart(8, '0');
        result += this.dec2bin(blue).padStart(8, '0');
        result += this.dec2bin(alpha).padStart(8, '0');

        return new BitSet(result.padStart(32 , '0'));
    }

    static bin2Rgba(bin : BitSet) : Array<number> {
        let split = bin.toString().padStart(32 , '0').split(/(.{8})/).filter(O=>O)
        
        let red = parseInt(split[0] , 2);
        let green =  parseInt(split[1] , 2);
        let blue =  parseInt(split[2] , 2);
        let alpha =  parseInt(split[3] , 2); 

        return [red , green, blue , alpha];
    }


    static dec2bin(dec) : string{
        return (dec >>> 0).toString(2);
    }

}