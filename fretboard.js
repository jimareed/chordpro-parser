

module.exports = {

  getFingerPositions: function(def) {

    frets = def.frets;

    positions = [];

    for (i = 0; i < frets.length; i++) {
      if (frets[i] > 0) {
        position = note2position({ string:i , fret:frets[i]});

        positions.push({ cx:position.cx , cy:position.cy });
      }
    }
    return positions;
  },

  getFretboard: function() {

    positions = [];

    for (f = 0; f < 5; f++) {
      for (s = 0; s < 6; s++) {
        position = note2position({ string:s , fret:f});

        positions.push({ string:s , fret:f , cx:position.cx , cy:position.cy });
      }
    }

    return positions;
  },

  selectFret: function(def, selected) {
    if (selected.string < 0 || selected.string > 5) {
      return def;
    }
    def.frets[selected.string] = selected.fret;

    return def;
  },

};

function note2position(note) {
  position = { cx:0 , cy:0 };

  if ((note.string+1) % 2 == 0) {
    position.cx = 15 * (note.string+1) / 2;
  } else {
    position.cx = 15 * note.string / 2 + 7;
  }
  if (note.fret == 0) {
    position.cy = 4;
  }
  if (note.fret == 1) {
    position.cy = 11;
  }
  if (note.fret == 2) {
    position.cy = 18;
  }
  if (note.fret == 3) {
    position.cy = 26;
  }
  if (note.fret == 4) {
    position.cy = 33;
  }

  return position;
}
