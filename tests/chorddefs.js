var should = require('chai').should(),
    chorddefs = require('../chorddefs')

describe('#chorddefs', function() {

  it('should get defs', function() {

    defs = chorddefs.getdefs(["Am"]);
    defs.length.should.equal(1);
    defs[0].define.should.equal("{define: Am base-fret 0 frets x 0 2 2 1 0}");

    defs = chorddefs.getdefs(["Am", "G"]);
    defs.length.should.equal(2);
    defs[0].define.should.equal("{define: Am base-fret 0 frets x 0 2 2 1 0}");
    defs[1].define.should.equal("{define: G base-fret 0 frets 3 2 0 0 0 3}");

    defs = chorddefs.getdefs(["G", "Am"]);
    defs.length.should.equal(2);
    defs[0].define.should.equal("{define: G base-fret 0 frets 3 2 0 0 0 3}");
    defs[1].define.should.equal("{define: Am base-fret 0 frets x 0 2 2 1 0}");
  });

  it('should convert defs toString', function() {

    defs = chorddefs.getdefs(["G", "Am"]);
    string = chorddefs.toString(defs);

    string.should.equal(
      "{define: G base-fret 0 frets 3 2 0 0 0 3}\n" +
      "{define: Am base-fret 0 frets x 0 2 2 1 0}\n");
  });

  it('should sort defs', function() {

    defs = chorddefs.sort();

/*
    for (i = 0; i < defs.length; i++) {
      console.log("  { rank:0, name:\"" +
                  defs[i].name +
                  "\", define:\"" +
                  defs[i].define +
                  "\" },");
    }
*/

    defs[0].name.should.equal("Ab");
  });

});
