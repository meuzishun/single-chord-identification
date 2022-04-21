export class Note {
  #midiNumber;

  constructor(midiNumber) {
    this.#midiNumber = midiNumber;
  }

  getMidiNumber() {
    return this.#midiNumber;
  }

  down8ves(num) {
    return this.#midiNumber - 12 * num;
  }

  up8ves(num) {
    return this.#midiNumber + 12 * num;
  }
}
