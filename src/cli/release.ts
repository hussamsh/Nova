const packager = require('electron-packager')

import fs from 'fs';
var archiver = require('archiver');
import ora from './ora'

const AWS = require('aws-sdk');
let s3 = new AWS.S3();

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
        "out" : "release-builds"
    });

    spinner.succeed("Generated windows release builds");

    let path = "./nova-windows.zip";

    compress(path, () => {

        uploadFile(path , "windows");

    });

}

async function macRelease() {
 
    let spinner = ora().start("Building mac release files");

    await packager({
        "quiet" : true,
        "dir" : ".",
        "platform" : "darwin",
        "overwrite" : true,
        "asar" : true,
        "arch" : "x64",
        "icon" : "./app/assets/images/nova.icns",
        "out" : "release-builds",
    });

    spinner.succeed("Generated mac release builds");

    let path = "./nova-mac.zip";

    compress(path, () => {

        uploadFile(path , "macOs");

    });

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
    });

    spinner.succeed("Generated linux release builds");


    const linuxPath = "./nova-linux.zip";

    compress(linuxPath, () => {

        uploadFile(linuxPath , "linux");

    });

}


function uploadFile(path : string , platform : string) {
    const file = fs.readFileSync(path);

    let key = "release-builds/";
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

function compress(path, callback){

    let spinner = ora().start("Compressing build files");

    var output = fs.createWriteStream(path);
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });

    archive.on('error', function(err) {
        throw err;
    });

    output.on('close', function() {
        spinner.succeed("Build Files zipped successfully");
        callback();
    });

    archive.pipe(output);

    archive.directory('./release-builds' , false);
    archive.finalize();
}


