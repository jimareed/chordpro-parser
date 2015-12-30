module.exports = {

  fromString: function(chordpro) {
    title = "";
    artist = "";
    lyrics = [];

    lines = chordpro.split("\n");

    for (i = 0; i < lines.length; i++) {
      line = lines[i].trim();

      if (line.search("{t") >= 0) {
        start = line.indexOf("{t:");
        if (start >= 0) {
          start += 3;
        } else {
          start = line.indexOf("{title:");
          if (start >= 0) {
            start += 7;
          }
        }
        end = line.indexOf("}");
        if (start >= 0 && end > 0 && end > start) {
          title = line.substring(start,end);
        }
      } else if (line.search("{st") >= 0) {
        start = line.indexOf("{st:");
        if (start >= 0) {
          start += 4;
        }
        end = line.indexOf("}");
        if (start >= 0 && end > 0 && end > start) {
          artist = line.substring(start,end);
        }
      } else {
        lyrics.push(line);
      }
    }

    return { title:title , artist:artist , lyrics:lyrics };
  }

};
