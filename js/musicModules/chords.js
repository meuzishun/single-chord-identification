import { Chord } from './chord.js';
import { Progression } from './progression.js';

const majorTonicTriad = new Chord([0, 4, 7]);
// majorTonicTriad.createInitialVoicing();
// majorTonicTriad.createVoicings();

const majorSuperTonicTriad = new Chord([2, 5, 9]);
// majorSuperTonicTriad.createInitialVoicing();
// majorSuperTonicTriad.createVoicings();

const majorMediantTriad = new Chord([4, 7, 11]);
// majorMediantTriad.createInitialVoicing();
// majorMediantTriad.createVoicings();

const majorSubdominantTriad = new Chord([-7, -3, 0]);
// majorSubdominantTriad.createInitialVoicing();
// majorSubdominantTriad.createVoicings();

const majorDominantTriad = new Chord([-5, -1, 2]);
// majorDominantTriad.createInitialVoicing();
// majorDominantTriad.createVoicings();

const majorSubmediantTriad = new Chord([-3, 0, 4]);
// majorSubmediantTriad.createInitialVoicing();
// majorSubmediantTriad.createVoicings();

const majorLeadingToneTriad = new Chord([-1, 2, 5]);
// majorLeadingToneTriad.createInitialVoicing();
// majorLeadingToneTriad.createVoicings();

console.log(majorLeadingToneTriad.getVoicings());

export const chords = {
  // tonicTriads: [
  //   [-12, -8, -5, 0],
  //   [-12, -5, 0, 4],
  //   [-12, 0, 4, 7],
  //   [-12, 4, 7, 12],
  //   [-12, -8, 0, 7],
  //   [-12, -5, 4, 12],
  //   [-12, 0, 7, 16],
  //   [-12, 4, 12, 19],
  // ],
  tonicTriads: majorTonicTriad.getVoicings(),
  superTonicTriads: majorSuperTonicTriad.getVoicings(),
  mediantTriads: majorMediantTriad.getVoicings(),
  subdominantTriads: majorSubdominantTriad.getVoicings(),
  dominantTriads: majorDominantTriad.getVoicings(),
  submediantTriads: majorSubmediantTriad.getVoicings(),
  leadingToneTriads: majorLeadingToneTriad.getVoicings(),

  // superTonicTriads: [
  //   [-10, -7, -3, 2],
  //   [-10, -3, 2, 5],
  //   [-10, 2, 5, 9],
  //   [-10, 5, 9, 14],
  //   [-10, -7, 2, 9],
  //   [-10, -3, 5, 14],
  //   [-10, 2, 9, 17],
  //   [-10, 5, 14, 21],
  // ],

  // dominantTriads: [
  //   [-17, -10, -5, -1],
  //   [-17, -5, -1, 2],
  //   [-17, -1, 2, 7],
  //   [-17, 2, 7, 11],
  //   [-17, -10, -1, 7],
  //   [-17, -5, 2, 11],
  //   [-17, -1, 7, 14],
  //   [-17, 2, 11, 19],
  // ],

  tonicizingProgression: [
    [-12, -5, 0, 4],
    [-19, -3, 0, 5],
    [-17, -5, 0, 4],
    [-17, -7, -1, 2],
    [-24, -8, -5, 0],
  ],

  tempTonicizingProg: [
    [-12, -5, 0, 4],
    [-19, -3, 0, 5],
    [-17, -5, 0, 4],
    [-17, -7, -1, 2],
    [-24, -8, -5, 0],
  ],

  tonicizingProgression: (function () {
    const midis = [
      [-12, -5, 0, 4],
      [-19, -3, 0, 5],
      [-17, -5, 0, 4],
      [-17, -7, -1, 2],
      [-24, -8, -5, 0],
    ];

    const progression = new Progression();
    midis.forEach((midi) => progression.addChord(midi));

    return progression;
  })(),
};
