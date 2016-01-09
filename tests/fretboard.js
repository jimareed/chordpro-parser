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

  it('can select no frets', function() {
    def = fretboard.selectFret({ frets:[-1,0,2,2,1,0] } , { string:-1 , fret:0 } );
    def.frets.length.should.equal(6);
    def.frets[0].should.equal(-1);
    def.frets[1].should.equal(0);
    def.frets[2].should.equal(2);
    def.frets[3].should.equal(2);
    def.frets[4].should.equal(1);
    def.frets[5].should.equal(0);
  });

  it('can select a fret', function() {
    def = fretboard.selectFret({ frets:[-1,0,2,2,1,0] } , { string:2 , fret:3 } );
    def.frets.length.should.equal(6);
    def.frets[0].should.equal(-1);
    def.frets[1].should.equal(0);
    def.frets[2].should.equal(3);
    def.frets[3].should.equal(2);
    def.frets[4].should.equal(1);
    def.frets[5].should.equal(0);
  });

  it('should return the full fretboard', function() {
    positions = fretboard.getFretboard();
    positions[0].string.should.equal(0);
    positions[0].fret.should.equal(0);
    positions[0].cx.should.equal(7);
    positions[0].cy.should.equal(4);
    positions[6].string.should.equal(0);
    positions[6].fret.should.equal(1);
    positions[6].cx.should.equal(7);
    positions[6].cy.should.equal(11);
  });

});
