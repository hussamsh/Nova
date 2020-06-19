
import {describe , it} from 'mocha'
import fs from 'fs';
import 'chai/register-should';
import Maps from '../maps/Maps';
import { EncryptionOperation, DecryptionOperation } from '../Operations';
import { Events } from '../helpers/Enums';
import {inputImagePath , encryptedImagePath , decryptedImagePath} from './Path';

var resemble = require('node-resemble-js');


let parameters = {
  "Growth rate" : "4",
  "Initial condition" : "1.2",
  "Generalization parameter" : "1"
};

describe("Double humped map cryptography" , function() {

  this.timeout(20000);

  describe("Encrypt test image" , () => {

    it("Encrypt Thread called and completed successfully" , (done) => {
    
      let encryption = new EncryptionOperation(Maps.DH.getName() , parameters , false , inputImagePath , encryptedImagePath);

      encryption.setCallback(Events.FINISHED , () => {
          done();
      });

      encryption.start();

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

    it("Decrypt Thread called and completed successfully" , (done) => {
      
    
      let decryption = new DecryptionOperation(Maps.DH.getName() , parameters , false , encryptedImagePath , decryptedImagePath);

      decryption.setCallback(Events.FINISHED , () => {
          done();
      });

      decryption.start();

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

    
    after( () => {
      fs.unlinkSync(encryptedImagePath);
      fs.unlinkSync(decryptedImagePath);
    });
    
  });

});