import { EncryptionAlgorithm } from "../interfaces/EncryptionAlgorithm";
import { Helpers } from "./Helpers";

//Double humped map encryption information
export class Henon implements EncryptionAlgorithm {
    
    getName(): String {
        return "Hénon Map Encryption";
    }
    

    getEquation(): String {
        return "f(x,y) = \\begin{cases} x_{n+1}=1-1.4x_{n}^{2}+y_{n} \\\\ y_{n+1}=0.3x_{n} \\end{cases}";
    }
 
    getParameters(): { symbol: String; name: String; }[] {
        return [
            {
                symbol : "x_n",
                name : "x"
            },
            {
                symbol : "y_n",
                name : "y",
            },
            // {
            //     symbol : "\\alpha",
            //     name : "alpha",
            // },
            // {
            //     symbol : "\\beta",
            //     name : "beta",
            // },
            
        ]
    }

}