var should = require('chai').should(),
    text2chordpro = require('../text2chordpro'),
    chordpro = require('../chordpro')

describe('#text2chordpro', function() {

  it('should convert title and artist', function() {
    string = text2chordpro.fromText("Hello");
    song = chordpro.fromString(string);
    song.title.should.equal("Hello");

    string = text2chordpro.fromText("Song 1\nArtist 1\n");
    song = chordpro.fromString(string);
    song.title.should.equal("Song 1");
    song.artist.should.equal("Artist 1");

    string = text2chordpro.fromText("Song 1\nArtist 1\n[Am]This is [C]my song.");
    song = chordpro.fromString(string);
    song.title.should.equal("Song 1");
    song.artist.should.equal("Artist 1");
  });

  it('should detect if text or chordpro format', function() {
    result = text2chordpro.isChordpro("Hello");
    result.should.equal(false);

    string = text2chordpro.isChordpro("{t:Song 1}\n{st:Artist 1}\n");
    result.should.equal(true);
  });

  it('should convert chords', function() {
    string = text2chordpro.fromText("Have Yourself A Merry Little Christmas\nFrank Sinatra\n\nG        Em      Am            D7\nHave yourself a merry little Christmas\nG        Em        Am      D7\nLet your heart be light");
    song = chordpro.fromString(string);
    song.chords.length.should.equal(8);
    song.chords[0].name.should.equal("G");
    song.chords[0].line.should.equal(0);
    song.chords[0].col.should.equal(0);
    song.chords[1].name.should.equal("Em");
    song.chords[1].line.should.equal(0);
    song.chords[1].col.should.equal(9);
    song.chords[2].name.should.equal("Am");
    song.chords[3].name.should.equal("D7");
    song.chords[4].name.should.equal("G");
    song.chords[5].name.should.equal("Em");
    song.chords[6].name.should.equal("Am");
    song.chords[7].name.should.equal("D7");
  });
});
