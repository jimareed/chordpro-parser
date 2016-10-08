# chordpro-parser

## description

Javascript library to parse chordpro files like:
```
{t:Greensleeves}
{st:Traditional}

{define: Am base-fret 0 frets x 0 2 2 1 0}

A[Am]las, my [C]love, you [G]do me [Em]wrong,
to [Am]cast me off disc[E]ourteously.
For [Am]I have [C]loved you [G]well and [Em]long,
de[Am]lighting [E7]in your [Am]company.

[C]Greensleeves was [G]all my [Em]joy,
[Am]Greensleeves was [E]my delight
[C]Greensleeves was my [G]heart of [Em]gold,
and [Am]who but my [E7]lady [Am]greensleeves.
```

## API

Refer to the tests folder to see the full API
```
it('should parse title and artist', function() {
  song = chordpro.fromString("{t:Song 1}\n{st:Artist 1}\n");
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
```


## run tests

```
cd chordpro
npm install
./node_modules/.bin/mocha tests
```
