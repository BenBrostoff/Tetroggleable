
describe ("tile", function(){
  beforeEach(function () {
    tile = new Tile();
  });

     it("set tile to a letter", function() {
      tile.letter = "A"
      expect(tile.letter).toBe("A");
      });

     it("set tile to a score value", function() {
      tile.score = 1
      expect(tile.score).toBe(1);
      });

     it("set tile to have scrabble value", function() {
      tile.scrabbleExtras = "LX2"
      expect(tile.scrabbleExtras).toBe("LX2");
    });
});

describe ("LBlock", function () {
  beforeEach(function () {
    lBlock = new LBlock(tile);
    lblock.tile[0].letter = 'A';
    lblock.tile[1].letter = 'B';
    lblock.tile[2].letter = 'C';
    lblock.tile[3].letter = 'D';
    });

     it("should return an LBlock rotation object", function() {

      expect(lBlock.rotation1).toBeDefined();
      expect(lBlock.rotation1[0].tile.letter).toEq('A') 
     });

     it("should return an LBlock rotation object", function() {

      expect(lBlock.rotation2).toBeDefined();

     });

     it("should return an LBlock rotation object", function() {

      expect(lBlock.rotation3).toBeDefined();

     });

     it("should return an LBlock rotation object", function() {

      expect(lBlock.rotation4).toBeDefined();

    });
});

describe ("JBlock", function () {
  beforeEach(function () {
    jBlock = new JBlock([]);
    });

     it("should return an JBlock rotation object", function() {

      expect(jBlock.rotation1).toBeDefined();
     });

     it("should return an JBlock rotation object", function() {

      expect(jBlock.rotation2).toBeDefined();

     });

     it("should return an JBlock rotation object", function() {

      expect(jBlock.rotation3).toBeDefined();

     });

     it("should return an JBlock rotation object", function() {

      expect(jBlock.rotation4).toBeDefined();

    });
});

describe ("OBlock", function () {
  beforeEach(function () {
    oBlock = new OBlock([]);
    });

     it("should return an OBlock rotation object", function() {

      expect(oBlock.rotation1).toBeDefined();
     });

     it("should return an OBlock rotation object", function() {

      expect(oBlock.rotation2).toBeDefined();

     });

     it("should return an OBlock rotation object", function() {

      expect(oBlock.rotation3).toBeDefined();

     });

     it("should return an OBlock rotation object", function() {

      expect(oBlock.rotation4).toBeDefined();

     });
  });

describe ("TBlock", function () {
  beforeEach(function () {
    tBlock = new TBlock([]);
    });

     it("should return an TBlock rotation object", function() {

      expect(tBlock.rotation1).toBeDefined();
     });

     it("should return an TBlock rotation object", function() {

      expect(tBlock.rotation2).toBeDefined();

     });

     it("should return an TBlock rotation object", function() {

      expect(tBlock.rotation3).toBeDefined();

     });

     it("should return an TBlock rotation object", function() {

      expect(tBlock.rotation4).toBeDefined();

     });
  });