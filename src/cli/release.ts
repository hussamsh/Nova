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


    uploadFile(windowsPath , "windows");

}


function macRelease() {
 
    console.log("Release for mac");

}

async function linuxRelease() {
    
    let spinner = ora().start("Building linux release files");

    await packager({
        "quiet" : true,
        "dir" : ".",
        "platform" : "linux",
        "overwrite" : true,
        "asar" : true,
        "arch" : "x64",
        "icon" : "./app/assets/images/nova.png",
        "out" : "release-builds",
        "extraResource" : [
            "./dist/Encrypt.js",
            "./dist/Decrypt.js"
        ]
    });

    spinner.succeed("Generated linux release builds");


    const productionDir = __dirname + "/../production-builds";
    const linuxPath = productionDir + "/nova-linux.zip";

    if (!fs.existsSync(productionDir)){
        fs.mkdirSync(productionDir);
    }

    spinner = ora().start("Compressing linux build files");


    var output = fs.createWriteStream(linuxPath);
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });

    archive.on('error', function(err) {
        throw err;
    });

    output.on('close', function() {
        spinner.succeed("Linux build Files zipped successfully");
    });

    archive.pipe(output);

    archive.directory('./release-builds' , false);
    archive.finalize();


    uploadFile(linuxPath , "linux");

}


function uploadFile(path : string , platform : string) {
    const file = fs.readFileSync(path);

    let key = "release/builds/";
    switch(platform){
        case "windows":
            key += "nova-windows.zip";
            break;
        case "linux":
            key += "nova-linux.zip";
            break;
        case "macOs":
            key += "nova-macOs.zip";
            break;
    }

    
    const params = {
        Key : key,
        Bucket : "com.hossamsherif.nova",
        Body : file,
        ACL:'public-read'
    }

    let spinner = ora().start("Uploading " + platform + " build");

    s3.upload(params, (err, data) => {
        if(err){
            throw err;
        }

        spinner.succeed(platform + " build uploaded sccessfully");
    })

}



