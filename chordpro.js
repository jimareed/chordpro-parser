
module.exports = {

  fromString: function(input) {
    title = "";
    artist = "";
    lyrics = [];
    chords = [];

    lines = input.split("\n");

    for (i = 0; i < lines.length; i++) {
      line = lines[i].trim();

      if (isaDirective(line)) {
        directive = parseDirective(line);

        if (directive.name == 'title') {
          title = directive.value;
        }
        if (directive.name == 'subtitle') {
          artist = directive.value;
        }
      } else {
        if (i == lines.length-1 && !line) {
          // ignore last line if it's empty
        } else {
          lyric = parseLyric(line);
          lyrics.push(lyric.text);
          for (c = 0; c < lyric.chords.length; c++) {
            chords.push(lyric.chords[c]);
          }
        }
      }
    }

    return { title:title , artist:artist , lyrics:lyrics , chords:chords };
  }

};

var directiveRegEx = /{([^}]+):([^}]+)}/;

function isaDirective(line) {
  return directiveRegEx.test(line);
}

function parseDirective(line) {
  var matches = directiveRegEx.exec(line);

  if (matches.length == 3) {
    if (matches[1] == 't') {
      matches[1] = 'title';
    }
    if (matches[1] == 'st') {
      matches[1] = 'subtitle';
    }
    return { name:matches[1] , value:matches[2] }
  }

  return {};
}

function parseLyric(line) {

  lyric = "";

  isaChord = false;
  chord = "";
  linechords = [];

  for (j=0; j < line.length; j++) {
    if (line[j] == '[') {
      isaChord = true;
    } else if (line[j] == ']') {
      isaChord = false;
      linechords.push(chord);
      chord = "";
    } else {
      if (isaChord) {
        chord += line[j];
      } else {
        lyric += line[j];
      }
    }
  }

  return { text:lyric , chords:linechords };

}
