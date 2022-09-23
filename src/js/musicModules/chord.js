import { Note } from './note.js';

export class Chord {
  #normalizedMidi;
  #notes;
  #initialVoicing;
  #voicings;

  constructor(normalizedMidi) {
    //? Should we ensure that normalizedMidi is an array?
    this.#normalizedMidi = normalizedMidi;
    this.init();
    this.#voicings = [];
    this.#createInitialVoicing();
    this.#createVoicings();
  }

  getNormalizedMidi() {
    return this.#normalizedMidi;
  }

  init() {
    this.#notes = this.#normalizedMidi.map((midi) => new Note(midi));
  }

  getNotes() {
    return this.#notes;
  }

  #createInitialVoicing() {
    this.#initialVoicing = this.#notes.map((note) => note.down8ves(1));
    //TODO: normalized midi voicing length... if 3, do this ->
    if (this.#normalizedMidi.length === 3) {
      this.#initialVoicing.push(this.#notes[0].getMidiNumber());
    }
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
    this.#voicings.splice(2, 1);
  }

  getVoicings() {
    return this.#voicings;
  }
}
