import {describe , it} from 'mocha'
import { Helpers } from '../nova/Helpers';
import BitSet from 'bitset';
import fs from 'fs';
import 'chai/register-should';
import EncryptionTypes from '../nova/EncryptionTypes';
const { Worker } = require('worker_threads');
var resemble = require('node-resemble-js');

let imageTestFolder = __dirname + "/../app/assets/images/testing";
let inputImagePath = imageTestFolder + "/test_image.png";
let encryptedImagePath = imageTestFolder +"/test_image_encrypted.png";
let decryptedImagePath = imageTestFolder +"/test_image_decrypted.png";

describe("Helpers" , () => {

  describe("Decimal to binary conversion" , () => {

    it("Convert 0" , () => {
      Helpers.dec2bin(0).should.equal("00000000");
    });

    it("Convert 1" , () => {
      Helpers.dec2bin(255).should.equal("11111111");
    });

    it("Convert 156" , () => {
      Helpers.dec2bin(156).should.equal("10011100");
    });

  });

  describe("RGBA to Binary conversion" , () => {
  
    it("Convert 255-255-255-255" , () => {
      Helpers.rgba2Bin(255,255,255,255).equals(new BitSet("11111111111111111111111111111111")).should.equal(true);
    })
  
    it("Convert 0-0-0-0" , () => {
      Helpers.rgba2Bin(0,0,0,0).equals(new BitSet(0)).should.equal(true);
    })

    it("Convert 170-145-229-5" , () => {
      Helpers.rgba2Bin(170,145,229,5).equals(new BitSet("10101010100100011110010100000101")).should.equal(true);
    })

  })

  describe("Binary to RGBA conversion" , () => {
    
    it("Convert all 1's", () => {
      let rgba = Helpers.bin2Rgba(new BitSet("11111111111111111111111111111111"));
      rgba[0].should.equal(255);
      rgba[1].should.equal(255);
      rgba[2].should.equal(255);
      rgba[3].should.equal(255);
    });

    it("Convert all 0's", () => {
      let rgba = Helpers.bin2Rgba(new BitSet(0));
      rgba[0].should.equal(0);
      rgba[1].should.equal(0);
      rgba[2].should.equal(0);
      rgba[3].should.equal(0);
    });

    it("Convert 01000111000010110111011011101010", () => {
      let rgba = Helpers.bin2Rgba(new BitSet("01000111000010110111011011101010"));
      rgba[0].should.equal(71);
      rgba[1].should.equal(11);
      rgba[2].should.equal(118);
      rgba[3].should.equal(234);
    });

  });

 
});

describe("Double humped map cryptography" , function() {
  this.timeout(300000);

 

  describe("Encrypt test image" , () => {

    it("Encrypt Worker module called and completed successfully" , (done) => {
      let data = {
        workerData : {
          algorithm : EncryptionTypes.DH.getName(),
          parameters : {
            "Growth rate" : "1",
            "Inital condition" : "1.2",
            "Generalization parameter" : "1"
          },
          inputPath : inputImagePath,
          outputFolder : imageTestFolder
        }
      };
    
      let worker = new Worker('./dist/Encrypt.js', data);
  
      worker.on('exit' , code =>{
        done();
      });

    });
    
    it("Encrypted file should be in the designated output path" , () => {
      fs.existsSync(encryptedImagePath).should.equal(true);
    });

    let comparison;

    it("Compare encrypted and original image" , (done) => {

      resemble(inputImagePath).compareTo(encryptedImagePath).onComplete( data => {
        comparison = data;
        done();
      });
      
    });

    it("Is same dimension as original image" , () => {
      ( comparison.isSameDimensions).should.equal(true);
    });


    it("Mismatch over 95%" , () => {
      ( comparison.misMatchPercentage > 95 ).should.equal(true);
    });
    
    
    
  });

  describe("Decrypt test image" , () => {


    it("Decrypt Worker module called and completed successfully" , (done) => {
      let data = {
        workerData : {
          algorithm : EncryptionTypes.DH.getName(),
          parameters : {
            "Growth rate" : "1",
            "Inital condition" : "1.2",
            "Generalization parameter" : "1"
          },
          inputPath : encryptedImagePath,
          outputFolder : imageTestFolder
        }
      };
    
      let worker = new Worker('./dist/Decrypt.js', data);
  
      worker.on('exit' , code =>{
        done();
      });

    });
    
    it("Decrypted file should be in the designated output path" , () => {
      fs.existsSync(decryptedImagePath).should.equal(true);
    });

    let comparison;

    it("Compare decrypted and original image" , (done) => {

      resemble(inputImagePath).compareTo(decryptedImagePath).onComplete( data => {
        comparison = data;
        done();
      });
      
    });

    it("Is same dimension as original image" , () => {
      ( comparison.isSameDimensions).should.equal(true);
    });


    it("Mismatch is zero" , () => {
      ( comparison.misMatchPercentage == 0 ).should.equal(true);
    });

    
    // after( () => {
    //   fs.unlinkSync(encryptedImagePath);
    //   fs.unlinkSync(decryptedImagePath);
    // });
    
  });

});

describe("Logistic map cryptography" , function() {
  this.timeout(300000);

  let imageTestFolder = __dirname + "/../app/assets/images/testing";
  let inputImagePath = imageTestFolder + "/test_image.png";
  let encryptedImagePath = imageTestFolder +"/test_image_encrypted.png";
  let decryptedImagePath = imageTestFolder +"/test_image_decrypted.png";

  describe("Encrypt test image" , () => {

    it("Encrypt Worker module called and completed successfully" , (done) => {
      let data = {
        workerData : {
          algorithm : EncryptionTypes.Logistic.getName(),
          parameters : {
            "Growth rate" : "3.72",
            "Inital condition" : "0.4",
          },
          inputPath : inputImagePath,
          outputFolder : imageTestFolder
        }
      };
    
      let worker = new Worker('./dist/Encrypt.js', data);
  
      worker.on('exit' , code =>{
        done();
      });

    });
    
    it("Encrypted file should be in the designated output path" , () => {
      fs.existsSync(encryptedImagePath).should.equal(true);
    });

    let comparison;

    it("Compare encrypted and original image" , (done) => {

      resemble(inputImagePath).compareTo(encryptedImagePath).onComplete( data => {
        comparison = data;
        done();
      });
      
    });

    it("Is same dimension as original image" , () => {
      ( comparison.isSameDimensions).should.equal(true);
    });


    it("Mismatch over 95%" , () => {
      ( comparison.misMatchPercentage > 95 ).should.equal(true);
    });
    
    
    
  });

  describe("Decrypt test image" , () => {

    it("Decrypt Worker module called and completed successfully" , (done) => {
      let data = {
        workerData : {
          algorithm : EncryptionTypes.Logistic.getName(),
          parameters : {
            "Growth rate" : "3.72",
            "Inital condition" : "0.4",
          },
          inputPath : encryptedImagePath,
          outputFolder : imageTestFolder
        }
      };
    
      let worker = new Worker('./dist/Decrypt.js', data);
  
      worker.on('exit' , code =>{
        done();
      });

    });
    
    it("Decrypted file should be in the designated output path" , () => {
      fs.existsSync(decryptedImagePath).should.equal(true);
    });

    let comparison;

    it("Compare decrypted and original image" , (done) => {

      resemble(inputImagePath).compareTo(decryptedImagePath).onComplete( data => {
        comparison = data;
        done();
      });
      
    });

    it("Is same dimension as original image" , () => {
      ( comparison.isSameDimensions).should.equal(true);
    });


    it("Mismatch is zero" , () => {
      ( comparison.misMatchPercentage == 0 ).should.equal(true);
    });
    
    // after( () => {
    //   fs.unlinkSync(encryptedImagePath);
    //   fs.unlinkSync(decryptedImagePath);
    // });
    
  });

});