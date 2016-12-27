

module.exports = {

  isChordpro: function(input) {

    return hasCurlyBraces(input);
  },

  fromText: function(input) {
    title = "";
    artist = "";
    body = "";
    output = "";

    lines = input.split("\n");

    if (lines.length >= 1) {
      output += "{t:" + lines[0].trim() + "}\n";
    }
    if (lines.length >= 2) {
      output += "{st:" + lines[1].trim() + "}\n";
    }

    for (i = 2; i < lines.length; i++) {
      output += lines[i].trim() + "\n";
    }

    return output;
  }
};

function hasCurlyBraces(input) {
  result = false;

  if (input.indexOf("{") >= 0 && input.indexOf("}") >= 0) {
    result = true;
  }

  return result;
}
