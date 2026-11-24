import { Chord } from './chord.js';

export const chords = (function () {
  // id (see chordId) -> { chord, mode }
  const choices = {};

  const majorCategories = [
    'major_diatonic',
    'major_inversions',
    'major_secondary_dominants',
    'modal_borrowing_1',
    'modal_borrowing_2',
    'altered_dominants',
  ];
  const minorCategories = [
    'minor_diatonic',
    'minor_inversions',
    'minor_secondary_dominants',
  ];

  const modeOf = function (category) {
    if (majorCategories.includes(category)) return 'major';
    if (minorCategories.includes(category)) return 'minor';
    // Chords that work in either mode get a random tonicizing context.
    return ['major', 'minor'][Math.floor(Math.random() * 2)];
  };

  const addChord = function (id, category, midi) {
    choices[id] = { chord: new Chord(midi), category };
  };

  const getRandomChoice = function () {
    const ids = Object.keys(choices);
    const id = ids[Math.floor(Math.random() * ids.length)];
    const { chord, category } = choices[id];
    return { chord, id, mode: modeOf(category) };
  };

  const clearChoices = function () {
    for (const id in choices) {
      delete choices[id];
    }
  };

  const majorTonicizingProgression = [
    [-12, -5, 0, 4],
    [-19, -3, 0, 5],
    [-17, -5, 0, 4],
    [-17, -7, -1, 2],
    [-24, -8, -5, 0],
  ];

  const minorTonicizingProgression = [
    [-12, -5, 0, 3],
    [-19, -4, 0, 5],
    [-17, -5, 0, 3],
    [-17, -7, -1, 2],
    [-24, -9, -5, 0],
  ];

  return {
    choices,
    addChord,
    getRandomChoice,
    clearChoices,
    majorTonicizingProgression,
    minorTonicizingProgression,
  };
})();
