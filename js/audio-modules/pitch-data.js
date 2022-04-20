export class PitchData {
  #midiPitches;
  #tonic;

  constructor(midiPitches, tonic) {
    this.#midiPitches = midiPitches;
    this.#tonic = tonic;
  }

  getMidiPitches() {
    return this.#midiPitches;
  }

  getTonic() {
    return this.#tonic;
  }

  setTonic(tonic) {
    this.#tonic = tonic;
  }
}
