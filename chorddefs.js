

module.exports = {

  getdefs: function(chords) {

    defs = [];

    for (i = 0; i < chords.length; i++) {
      for (j = 0; j < alldefs.length; j++) {
        if (chords[i] == alldefs[j].chord && alldefs[j].rank == 0) {
          defs.push(alldefs[j]);
        }
      }
    }

    return defs;
  },

  toString: function(defs) {
    string = "";

    for (i = 0; i < defs.length; i++) {
      string += defs[i].define + "\n";
    }

    return string;
  }
};


var alldefs = [
  { rank:0, chord:"Am", define:"{define: Am base-fret 0 frets x 0 2 2 1 0}" },
  { rank:0, chord:"G", define:"{define: G base-fret 0 frets 3 2 0 0 0 3}" }
]
