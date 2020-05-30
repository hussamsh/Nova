import { EncryptionAlgorithm } from "../interfaces/EncryptionAlgorithm";
const { Worker, isMainThread } = require('worker_threads');

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

    encrypt(growthRate : number , initialCondition : number , generalizationParam : number, inputPath : string , outputPath : string, onProgress : (progress : number) => void,  onFinish : () => void){
        
        if(isMainThread){

            let worker = new Worker('./dist/Encrypt.js', {workerData : {
                growthRate : growthRate,
                initialCondition : initialCondition,
                generalizationParam : generalizationParam,
                inputPath : inputPath,
                outputPath : outputPath
            }});


            worker.on('message' , data => {
                onProgress(data.progress);
            });

            worker.on('exit' , code =>{
                onFinish();
            });

        }

    }

    decrypt(growthRate : number , initialCondition : number , generalizationParam : number, inputPath : string , outputPath : string, onProgress : (progress : number) => void,  onFinish : () => void){
        
        if(isMainThread){

            let worker = new Worker('./dist/Decrypt.js', {workerData : {
                growthRate : growthRate,
                initialCondition : initialCondition,
                generalizationParam : generalizationParam,
                inputPath : inputPath,
                outputPath : outputPath
            }});
            
            worker.on('message' , data => {
                onProgress(data.progress);
            });
            
            worker.on('exit' , code =>{
                onFinish();
            })
        }

    }

}