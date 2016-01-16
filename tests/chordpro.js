var should = require('chai').should(),
    chordpro = require('../chordpro')

describe('#chordpro', function() {

  it('should parse title and artist', function() {
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

  it('should parse lyrics', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\nA[Am]las my [C]love,\nyou [G]do me [Em]wrong,\nto [Am]cast me off so dis[E]courteously.\n");
    song.title.should.equal("Greensleeves");
    song.artist.should.equal("Traditional");
    song.lyrics.length.should.equal(3);
    song.lyrics[0].should.equal("Alas my love,");
    song.lyrics[1].should.equal("you do me wrong,");
    song.lyrics[2].should.equal("to cast me off so discourteously.");
  });

  it('should parse chords', function() {
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

  it('should parse chord definitions', function() {
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

  it('should parse distinct chords', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\n" +
    "A[Am]las my [C]love,\nyou [G]do me [Em]wrong,\n" +
    "to [Am]cast me off so dis[E]courteously.\n");

    chords = chordpro.distinctChords(song);
    chords.length.should.equal(5);
    chords[0].should.equal("Am");
    chords[1].should.equal("C");
    chords[2].should.equal("G");
    chords[3].should.equal("Em");
    chords[4].should.equal("E");
  });

  it('should support adding chorddefs', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\n" +
      "{define: Am base-fret 0 frets x 0 2 2 1 0}\n" +
      "A[Am]las my [C]love,\nyou [G]do me [Em]wrong,\n");
    song.chorddefs.length.should.equal(1);
    song.chorddefs[0].name.should.equal("Am");

    song = chordpro.addDefs(song, [{ name:"G" , define:"{define: G base-fret 0 frets 3 2 0 0 0 3"}], { replace:false });
    song.chorddefs.length.should.equal(2);
    song.chorddefs[0].name.should.equal("Am");
    song.chorddefs[1].name.should.equal("G");

    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\n" +
      "{define: C base-fret 0 frets x 3 5 5 5 3}\n" +
      "A[Am]las my [C]love,\nyou [G]do me [Em]wrong,\n");

    song = chordpro.addDefs(song, [
        { name:"Am" , define:"{define: Am base-fret 0 frets x 0 2 2 1 0"},
        { name:"C" , define:"{define: C base-fret 0 frets x 3 2 0 1 0"},
        { name:"G" , define:"{define: G base-fret 0 frets 3 2 0 0 0 3"},
        { name:"Em" , define:"{define: Em base-fret 0 frets 0 2 2 0 0 0"},
      ],
      { replace:false }
    );
    song.chorddefs.length.should.equal(4);
    song.chorddefs[0].name.should.equal("C");
    song.chorddefs[0].frets[2].should.equal(5);
  });

  it('should support updating chorddefs', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\n" +
      "{define: Am base-fret 0 frets x 0 2 2 1 0}\n" +
      "A[Am]las my [C]love,\nyou [G]do me [Em]wrong,\n");
    song = chordpro.addDefs(song, [{ name:"Am" , define:"{define: Am base-fret 0 frets 5 7 7 5 5 5"}], { replace:true });
    song.chorddefs.length.should.equal(1);
    song.chorddefs[0].name.should.equal("Am");
    song.chorddefs[0].frets[0].should.equal(5);
  });

  it('should support either chorddef format', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\n" +
      "{define: Am base-fret 0 frets x 0 2 2 1 0}\n" +
      "A[Am]las my [C]love,\nyou [G]do me [Em]wrong,\n");
    song.chorddefs.length.should.equal(1);
    song.chorddefs[0].name.should.equal("Am");

    song = chordpro.addDefs(song, [{ name:"G" , basefret:"0" , frets:[3,2,0,0,0,3] }], { replace:false });
    song.chorddefs.length.should.equal(2);
    song.chorddefs[0].name.should.equal("Am");
    song.chorddefs[1].name.should.equal("G");
    song.chorddefs[1].frets[1].should.equal(2);
  });

  it('should support setting the chord sequence', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\n");

    song = chordpro.addDefs(song, [
      { name:"Am" , define:"{define: Am base-fret 0 frets x 0 2 2 1 0"},
      { name:"C" , define:"{define: C base-fret 0 frets x 3 2 0 1 0"},
      { name:"G" , define:"{define: G base-fret 0 frets 3 2 0 0 0 3"},
      { name:"Em" , define:"{define: Em base-fret 0 frets 0 2 2 0 0 0"},
    ], { replace:false });

    song = chordpro.setChordSequence(song, ["C","Am","Em","G"]);
    song.chorddefs.length.should.equal(4);
    song.chorddefs[0].name.should.equal("C");
    song.chorddefs[1].name.should.equal("Am");
    song.chorddefs[2].name.should.equal("Em");
    song.chorddefs[3].name.should.equal("G");

  });

  it('should convert a song without chords to a string', function() {
    song = chordpro.fromString("{title:Greensleeves}\n{st:Traditional}\nAlas my love,\n");

    string = chordpro.toString(song);

    song2 = chordpro.fromString(string);
    song2.title.should.equal("Greensleeves");
    song2.artist.should.equal("Traditional");
    song2.lyrics[0].should.equal("Alas my love,");
  });

  it('should convert a song with chords to a string', function() {
    song = chordpro.fromString("1234[Am7]5678\n");

    string = chordpro.toString(song);

    song2 = chordpro.fromString(string);
    song2.lyrics.length.should.equal(1);
    song2.lyrics[0].should.equal("12345678");
    song2.chords.length.should.equal(1);
    song2.chords[0].name.should.equal("Am7");
  });

  it('should convert chorddefs to string', function() {
    song = chordpro.fromString("{define: Am base-fret 0 frets x 0 2 2 1 0}\n");

    string = chordpro.toString(song);

    song2 = chordpro.fromString(string);
    song2.chorddefs.length.should.equal(1);
    song2.chorddefs[0].name = "Am";
    song2.chorddefs[0].frets[4] = 1;
  });

  it('should convert a song with multiple lines to a string', function() {
    song = chordpro.fromString("123\n4[Am7]5678\n");

    string = chordpro.toString(song);

    song2 = chordpro.fromString(string);
    song2.lyrics.length.should.equal(2);
    song2.lyrics[0].should.equal("123");
    song2.chords.length.should.equal(1);
    song2.chords[0].name.should.equal("Am7");
  });

  it('should convert a song with multiple chords to a string', function() {
    song = chordpro.fromString("123\n4[A]5[B]678\n9[C]012[D]\n");

    string = chordpro.toString(song);

    song2 = chordpro.fromString(string);
    song2.lyrics.length.should.equal(3);
    song2.lyrics[0].should.equal("123");
    song2.chords.length.should.equal(4);
    song2.chords[3].name.should.equal("D");
  });

});
