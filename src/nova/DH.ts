import { EncryptionAlgorithm } from "../interfaces/EncryptionAlgorithm";

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

}