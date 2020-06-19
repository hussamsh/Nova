
import { ipcRenderer } from "electron";
import { Events } from "../helpers/Enums";
import { EncryptionOperation , DecryptionOperation, Operation } from "../Operations";

ipcRenderer.on('crypto' , (event , input) => {

    let outputPath = getOutputPath(input.operation , input.imagePath , input.outputFolder);

    let cryptoOperation : Operation;


    if (input.operation == "encrypt") {
        cryptoOperation = new EncryptionOperation(input.algorithm , input.parameters , input.optimize, input.imagePath , outputPath);
    } else {
        cryptoOperation = new DecryptionOperation(input.algorithm , input.parameters , input.optimize, input.imagePath , outputPath);   
    }

    cryptoOperation.setCallback(Events.INITIALIZATING, () => {
        ipcRenderer.send(Events.PROGRESS , "Initializing");
    });

    cryptoOperation.setCallback(Events.READ_IMAGE , () => {
        ipcRenderer.send(Events.PROGRESS , "Reading image data");
    });

    cryptoOperation.setCallback(Events.RESIZING_IMAGE , () => {
        ipcRenderer.send(Events.PROGRESS , "Resizing image");
    })

    cryptoOperation.setCallback(Events.PROGRESS , (message) => {
        ipcRenderer.send(Events.PROGRESS , message);
    });

    //Currenlty only fails from Henon map reaching infinity
    cryptoOperation.setCallback(Events.FAILED , () => {
        ipcRenderer.send(Events.FAILED);
    });

    cryptoOperation.setCallback(Events.FINISHED, () => {
        ipcRenderer.send(Events.FINISHED);
    });

    cryptoOperation.start();

});

function getOutputPath(operation , imagePath , outputFolder) {
    
    //Get filename
    let filename = imagePath.replace(/^.*[\\\/]/, '').split('.');

    //File name without extension, if it has (_encrypted , _decrypted) remove them to avoid unnecessary long file name
    let name = filename[0].replace("_encrypted" , "");
    name = name.replace("_decrypted" , "");

    //Add _encrypted to the original file name -- For now always write to png files instead of original extension as this solves the problem of pixel information loss on resize.
    // let outputName = workerData.outputFolder + "/" + name + "_encrypted." + filename[1]; 
    let postfix = (operation == 'encrypt') ? "_encrypted.png" : "_decrypted.png";

    return outputFolder + "/" + name + postfix; 

}