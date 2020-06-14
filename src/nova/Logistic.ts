import { EncryptionAlgorithm } from "../interfaces/EncryptionAlgorithm";

//Logistic map encryption information
export class Logistic implements EncryptionAlgorithm{
    
    getName(): String {
        return "Logistic Map Encryption";
    }
    
    getEquation(): String {
        return "x_{n+1} = \\lambda  x_n (1-x_n)"
    }
    
    getParameters(): { symbol: String; name: String; }[] {
        return [
            {
                symbol : "x_n",
                name : "Initial condition"
            },
            {
                symbol : "λ",
                name : "Growth rate"
            }
        ]
    }
}