var should = require('chai').should(),
    chordpro = require('../chordpro')

describe('#execute', function() {

  it('chordpro', function() {

    var song = chordpro.fromString("{t:Hello}");
    song.title.should.equal("Hello");

    song = chordpro.fromString("{title:Song 1}\n{st:Artist 1}\n");
    song.title.should.equal("Song 1");
    song.artist.should.equal("Artist 1");

    song = chordpro.fromString("{title:Song 1}\n{st:Artist 1}\n");
    song.title.should.equal("Song 1");
    song.artist.should.equal("Artist 1");

    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\nA[Am]las my [C]love,\nyou [G]do me [Em]wrong,\nto [Am]cast me off so dis[E]courteously,\n");
    song.title.should.equal("Greensleeves");
    song.artist.should.equal("Traditional");
    song.lyrics[0].should.equal("A[Am]las my [C]love,");

  });
});
