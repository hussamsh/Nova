import { Map } from "../interfaces/Map";

//Double humped map encryption information
export class DH implements Map {
    
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
                name  : "Initial condition"
            },
            {
                symbol : "c",
                name : "Generalization parameter"
            }
        ]
    }

}