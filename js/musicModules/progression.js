import { Chord } from './chord.js';

export class Progression {
  #chords;
  #tonicized;

  constructor() {
    this.#chords = [];
  }

  getChords() {
    return this.#chords;
  }

  addChord(midi) {
    this.#chords.push(new Chord(midi));
  }

  tonicize(midiTonic) {
    this.#tonicized = this.#chords.map((chord) => {
      chord.tonicize(midiTonic);
      return chord.getTonicizedMidi();
    });
  }

  getTonicized() {
    return this.#tonicized;
  }
}
