var should = require('chai').should(),
    chordpro = require('../chordpro')

describe('#chordpro', function() {

  it('title and artist', function() {
    song = chordpro.fromString("{t:Hello}");
    song.title.should.equal("Hello");

    song = chordpro.fromString("{t:Song 1}\n{st:Artist 1}\n");
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
    song.chords[0].name.should.equal("Am");
    song.chords[0].line.should.equal(0);
    song.chords[0].col.should.equal(1);
    song.chords[1].name.should.equal("C");
    song.chords[1].line.should.equal(0);
    song.chords[1].col.should.equal(8);
    song.chords[2].name.should.equal("G");
    song.chords[3].name.should.equal("Em");
    song.chords[4].name.should.equal("Am");
    song.chords[5].name.should.equal("E");
  });

  it('chord definitions', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\n" +
      "{define: Am base-fret 0 frets x 0 2 2 1 0}\n" +
      "A[Am]las my [C]love,\nyou [G]do me [Em]wrong,\n");
    song.chorddefs.length.should.equal(1);
    song.chorddefs[0].name.should.equal("Am");
    song.chorddefs[0].basefret.should.equal(0);
    song.chorddefs[0].frets[0].should.equal(-1);
    song.chorddefs[0].frets[1].should.equal(0);
    song.chorddefs[0].frets[2].should.equal(2);
    song.chorddefs[0].frets[3].should.equal(2);
    song.chorddefs[0].frets[4].should.equal(1);
    song.chorddefs[0].frets[5].should.equal(0);

    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\n" +
      "{define: Am base-fret 0 frets x 0 2 2 1 0}\n" +
      "{define: G base-fret 0 frets 3 2 0 0 0 3}\n" +
      "A[Am]las my [C]love,\nyou [G]do me [Em]wrong,\n");
    song.chorddefs.length.should.equal(2);
    song.chorddefs[0].name.should.equal("Am");
    song.chorddefs[0].basefret.should.equal(0);
    song.chorddefs[0].frets[0].should.equal(-1);
    song.chorddefs[0].frets[1].should.equal(0);
    song.chorddefs[0].frets[2].should.equal(2);
    song.chorddefs[1].name.should.equal("G");
    song.chorddefs[1].basefret.should.equal(0);
    song.chorddefs[1].frets[0].should.equal(3);
    song.chorddefs[1].frets[1].should.equal(2);
    song.chorddefs[1].frets[2].should.equal(0);
  });


});
