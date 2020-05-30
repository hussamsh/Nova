

export default class Pixel {
    
    red : number;
    green : number;
    blue : number;
    alpha : number;

    constructor(red : number, green : number, blue: number , alpha : number){
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }



    getValues( callback : (value : number , index? : number) => void ){
        callback(this.red , 0);
        callback(this.green , 1);
        callback(this.blue , 2);
        callback(this.alpha , 3);
    }

    toString() : string{
        return  "Red : " + this.red + " , Green : " + this.green  + " , Blue : " + this.blue + " , Alpha : " + this.alpha;
    }

    
}