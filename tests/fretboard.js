var should = require('chai').should(),
    fretboard = require('../fretboard')

describe('#fretboard', function() {

  it('should return fret positions', function() {

    positions = fretboard.getFingerPositions({ frets:[-1,0,2,2,1,0] });
    positions.length.should.equal(3);
    positions[0].cy.should.equal(18);
    positions[1].cy.should.equal(18);
    positions[2].cy.should.equal(11);
    positions[0].cx.should.equal(22);
    positions[1].cx.should.equal(30);
    positions[2].cx.should.equal(37);
  });


  it('should return the full fretboard', function() {
    fb = fretboard.getFretboard({frets:[]});
    positions = fb.positions;
    positions[0].string.should.equal(0);
    positions[0].fret.should.equal(0);
    positions[0].cx.should.equal(7);
    positions[0].cy.should.equal(4);
    positions[6].string.should.equal(0);
    positions[6].fret.should.equal(1);
    positions[6].cx.should.equal(7);
    positions[6].cy.should.equal(11);
  });

  it('should return notes selected', function() {
    fb = fretboard.getFretboard({frets:[0,0,2,2,1,0]});
    positions = fb.positions;
    positions[9].selected.should.equal("0.05");
    positions[10].selected.should.equal("1.0");
    positions[11].selected.should.equal("0.05");
  });

  it('should select notes', function() {
    fb = fretboard.getFretboard({frets:[0,0,2,2,1,0]});
    fb = fretboard.selectPositionId(fb, "11");
    positions = fb.positions;
    positions[9].selected.should.equal("0.05");
    positions[10].selected.should.equal("1.0");
    positions[11].selected.should.equal("1.0");
  });

  it('should unselect previous note on string', function() {
    fb = fretboard.getFretboard({frets:[0,0,2,2,1,0]});
    fb = fretboard.selectPositionId(fb, "16");
    positions = fb.positions;
    positions[10].selected.should.equal("0.05");
    positions[16].selected.should.equal("1.0");
  });

  it('should unselect a selected note', function() {
    fb = fretboard.getFretboard({frets:[0,0,2,2,1,0]});
    fb = fretboard.selectPositionId(fb, "16");
    positions = fb.positions;
    positions[10].selected.should.equal("0.05");
    positions[16].selected.should.equal("1.0");

    fb = fretboard.selectPositionId(fb, "16");
    positions = fb.positions;
    positions[10].selected.should.equal("0.05");
    positions[16].selected.should.equal("0.05");
  });

  it('should update chorddef when selecting notes', function() {
    fb = fretboard.getFretboard({frets:[0,0,2,2,1,0]});
    fb = fretboard.selectPositionId(fb, "11");
    fb.chorddef.frets[4].should.equal(1);
    fb.chorddef.frets[4].should.equal(1);
  });


});
