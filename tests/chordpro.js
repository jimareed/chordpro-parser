var should = require('chai').should(),
    chordpro = require('../chordpro')

describe('#chordpro', function() {

  it('title and artist', function() {
    song = chordpro.fromString("{t:Hello}");
    song.title.should.equal("Hello");

    song = chordpro.fromString("{title:Song 1}\n{st:Artist 1}\n");
    song.title.should.equal("Song 1");
    song.artist.should.equal("Artist 1");

    song = chordpro.fromString("{title:Song 1}\n{st:Artist 1}\n");
    song.title.should.equal("Song 1");
    song.artist.should.equal("Artist 1");

    song = chordpro.fromString("{title:Song 1}\n{subtitle:Artist 1}\n");
    song.title.should.equal("Song 1");
    song.artist.should.equal("Artist 1");
  });

  it('lyrics', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\nA[Am]las my [C]love,\nyou [G]do me [Em]wrong,\nto [Am]cast me off so dis[E]courteously.\n");
    song.title.should.equal("Greensleeves");
    song.artist.should.equal("Traditional");
    song.lyrics.length.should.equal(3);
    song.lyrics[0].should.equal("Alas my love,");
    song.lyrics[1].should.equal("you do me wrong,");
    song.lyrics[2].should.equal("to cast me off so discourteously.");
  });

  it('chords', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\nA[Am]las my [C]love,\nyou [G]do me [Em]wrong,\nto [Am]cast me off so dis[E]courteously.\n");
    song.chords.length.should.equal(6);
    song.chords[0].should.equal("Am");
    song.chords[1].should.equal("C");
    song.chords[2].should.equal("G");
    song.chords[3].should.equal("Em");
    song.chords[4].should.equal("Am");
    song.chords[5].should.equal("E");
  });


});
