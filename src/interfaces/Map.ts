export interface Map {
    getName() : String;
    getEquation() : String;
    getParameters() : Array<{symbol : String , name : String}>;
}