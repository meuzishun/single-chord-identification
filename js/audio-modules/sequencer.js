import { Sequence } from './sequence.js';

export class Sequencer {
  #tempo;
  #sampler;
  #sequences;

  constructor(tempo, sampler) {
    this.#tempo = tempo;
    this.#sampler = sampler;
    this.#sequences = {};
  }

  getTempo() {
    return this.#tempo;
  }

  setTempo(tempo) {
    this.#tempo = tempo;
  }

  getSampler() {
    return this.#sampler;
  }

  setSampler(sampler) {
    this.#sampler = sampler;
  }

  addSequence(name, midiPitchData, scheduleData) {
    const sequence = new Sequence(midiPitchData, scheduleData, this);
    this.#sequences[name] = sequence;
  }

  getSequence(name) {
    return this.#sequences[name];
  }

  playSequence(name) {
    this.#sequences[name].start();
    console.log(this.#sequences[name]);
  }

  getSequences() {
    return this.#sequences;
  }

  clearSequences() {
    this.#sequences = {};
  }
}
