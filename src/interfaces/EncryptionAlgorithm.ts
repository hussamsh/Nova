export interface EncryptionAlgorithm {
    getName() : String;
    getEquation() : String;
    getParameters() : Array<{symbol : String , name : String}>;
}