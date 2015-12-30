
module.exports = {

  fromString: function(input) {
    title = "";
    artist = "";
    lyrics = [];

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
        lyric = parseLyric(line);
        lyrics.push(lyric.text);
      }
    }

    return { title:title , artist:artist , lyrics:lyrics };
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

  return { text:line };

}
