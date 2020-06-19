
import { Helpers } from '../helpers/Helpers';
import BitSet from 'bitset';
import 'chai/register-should';



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

    it("Convert 74" , () => {
        Helpers.dec2bin(74).should.equal("01001010");
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
