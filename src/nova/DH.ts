import { EncryptionAlgorithm } from "../interfaces/EncryptionAlgorithm";
import { Helpers } from "./Helpers";

//Double humped map encryption information
export class DH implements EncryptionAlgorithm {
    
    getName(): String {
        return "Double Humped Map Encryption";
    }

    getEquation(): String {
        return "x_{n+1} = \\lambda (x_n - c) ^ 2 ( c^2 - (x_n - c) ^ 2)";
    }

    getParameters(): { symbol: String; name: String; }[] {
        return [
            {
                symbol : "\\lambda",
                name : "Growth rate"
            },
            {
                symbol : "x_n",
                name  : "Inital condition"
            },
            {
                symbol : "c",
                name : "Generalization parameter"
            }
        ]
    }

    // parameterValuesValid(growthRate : number , initialCondition : number, generalizationParameter : number) : boolean {
        
    //     let r = bignumber(growthRate);
    //     let x = bignumber(initialCondition);
    //     let c = bignumber(generalizationParameter);

    //     let isValid = false;

    //     if( x < Helpers.math.multiply(bignumber(2) , c) ){
    //         isValid = true;
    //     }

    //     let cubed  = Helpers.math.cube(c);

    //     if(r < Helpers.math.divide(bignumber(8) , cubed)){
    //         isValid = true;
    //     }

    //     return isValid;
    // }

}