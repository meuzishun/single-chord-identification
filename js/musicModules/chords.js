import { Chord } from './chord.js';
import { Progression } from './progression.js';

export const chords = (function () {
  const choices = {};
  const majorOnly = {};
  const minorOnly = {};

  const addChord = function (category, name, midi) {
    const chord = new Chord(midi);
    choices[name] = chord;
    if (
      (category === 'major_secondary_dominants' && name !== 'V7_of_V') ||
      category === 'modal_borrowing_1' ||
      category === 'modal_borrowing_2' ||
      category === 'altered_dominants'
    ) {
      majorOnly[name] = chord;
    }
    if (category === 'minor_secondary_dominants') {
      minorOnly[name] = chord;
    }
  };

  const getRandomChoice = function () {
    const chords = Object.keys(choices);
    const key = chords[Math.floor(Math.random() * chords.length)];
    return { chord: choices[key], key };
  };

  const findCategory = function (key) {
    if (majorOnly.hasOwnProperty(key)) {
      return 'majorOnly';
    }
    if (minorOnly.hasOwnProperty(key)) {
      return 'minorOnly';
    }
    return ['majorOnly', 'minorOnly'][Math.floor(Math.random() * 2)];
  };

  const clearChoices = function () {
    for (const key in choices) {
      delete choices[key];
    }
    for (const key in majorOnly) {
      delete majorOnly[key];
    }
    for (const key in minorOnly) {
      delete minorOnly[key];
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

  // const tonicizingProgression = (function () {
  //   const midis = [
  //     [-12, -5, 0, 4],
  //     [-19, -3, 0, 5],
  //     [-17, -5, 0, 4],
  //     [-17, -7, -1, 2],
  //     [-24, -8, -5, 0],
  //   ];

  //   const progression = new Progression();
  //   midis.forEach((midi) => progression.addChord(midi));

  //   return progression;
  // })();

  return {
    choices,
    majorOnly,
    minorOnly,
    addChord,
    getRandomChoice,
    findCategory,
    clearChoices,
    majorTonicizingProgression,
    minorTonicizingProgression,
  };
})();
