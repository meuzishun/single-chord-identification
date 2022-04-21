import { Note } from './note.js';

export class Chord {
  #nomalizedMidi;
  #notes;
  #initialVoicing;
  #voicings;

  constructor(normalizedMidi) {
    //? Should we ensure that normalizedMidi is an array?
    this.#nomalizedMidi = normalizedMidi;
    this.init();
    this.#voicings = [];
    this.#createInitialVoicing();
    this.#createVoicings();
  }

  getNormalizedMidi() {
    return this.#nomalizedMidi;
  }

  init() {
    this.#notes = this.#nomalizedMidi.map((midi) => new Note(midi));
  }

  getNotes() {
    return this.#notes;
  }

  #createInitialVoicing() {
    this.#initialVoicing = this.#notes.map((note) => note.down8ves(1));
    this.#initialVoicing.push(this.#notes[0].getMidiNumber());
    return this.#initialVoicing;
  }

  getInitialVoicing() {
    return this.#initialVoicing;
  }

  #createVoicings() {
    this.#voicings.push(this.#initialVoicing);
    let prev = this.#initialVoicing;
    for (let i = 0; i < 4; i++) {
      const voicing1 = [...prev];
      voicing1[1] += 12;
      voicing1.sort((a, b) => a - b);
      const voicing2 = [...voicing1];
      voicing2[2] -= 12;
      voicing2.sort((a, b) => a - b);
      this.#voicings.push(voicing1);
      this.#voicings.push(voicing2);
      prev = voicing1;
    }
  }

  getVoicings() {
    return this.#voicings;
  }
}
