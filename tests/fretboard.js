var should = require('chai').should(),
    fretboard = require('../fretboard')

describe('#fretboard', function() {

  it('getFingerPositions', function() {

    positions = fretboard.getFingerPositions({ frets:[-1,0,2,2,1,0] });
    positions.length.should.equal(3);
    positions[0].cy.should.equal(18);
    positions[1].cy.should.equal(18);
    positions[2].cy.should.equal(11);
    positions[0].cx.should.equal(22);
    positions[1].cx.should.equal(30);
    positions[2].cx.should.equal(37);
  });

});
