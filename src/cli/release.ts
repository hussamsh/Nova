const packager = require('electron-packager')

import fs from 'fs';
var archiver = require('archiver');
import ora from './ora'

const AWS = require('aws-sdk');
let s3;

try {
    var credentials = require('../../aws.json');
    s3 = new AWS.S3({
        accessKeyId: credentials.ID,
        secretAccessKey: credentials.Secret
    });    
} catch (error) {
    s3 = new AWS.S3();
}

var input = require('minimist')(process.argv.slice(2));

if(input["platform"] == undefined){
    console.log("No platform selected");
    process.exit();
}

switch(input["platform"]){
    case "win" : 
        windowsRelease();
        break;
    case "mac" :
        macRelease();
        break;
    case "linux" :
        linuxRelease();
        break;
}

async function windowsRelease(){

    let spinner = ora().start("Building windows release files");

    await packager({
        "quiet" : true,
        "dir" : ".",
        "platform" : "win32",
        "overwrite" : true,
        "asar" : true,
        "arch" : "ia32",
        "icon" : "./app/assets/images/icon.ico",
        "out" : "release-builds",
        "extraResource" : [
            "./dist/Encrypt.js",
            "./dist/Decrypt.js"
        ]
    });

    spinner.succeed("Generated windows release builds");


    const productionDir = __dirname + "/../production-builds";
    const windowsPath = productionDir + "/nova-windows.zip";

    if (!fs.existsSync(productionDir)){
        fs.mkdirSync(productionDir);
    }

    spinner = ora().start("Compressing windows build files");


    var output = fs.createWriteStream(windowsPath);
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });

    archive.on('error', function(err) {
        throw err;
    });

    output.on('close', function() {
        spinner.succeed("Windows build Files zipped successfully");
    });

    archive.pipe(output);

    archive.directory('./release-builds' , false);
    archive.finalize();


    uploadFile(windowsPath);

}


function macRelease() {
 
    console.log("Release for mac");

    
}

function linuxRelease() {
    
    console.log("Release for linux");

}


function uploadFile(path : string) {
    const file = fs.readFileSync(path);

    const params = {
        Key : "release-builds/ruby.rar",
        Bucket : "com.hossamsherif.nova",
        Body : file,
        ACL:'public-read'
    }

    let spinner = ora().start("Uploading windows build");

    s3.upload(params, (err, data) => {
        if(err){
            throw err;
        }

        spinner.succeed("Windows build uploaded sccessfully");
    })

}



