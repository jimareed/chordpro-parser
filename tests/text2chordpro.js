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

});
