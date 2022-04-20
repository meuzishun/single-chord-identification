export class AudioEvent {
  #midiPitchContent;
  #duration;
  #delay;
  #sequencer;
  #pitchData;

  constructor(midiPitchContent, duration, delay, sequencer, pitchData) {
    this.#midiPitchContent = midiPitchContent;
    this.#duration = duration;
    this.#delay = delay;
    this.#sequencer = sequencer;
    this.#pitchData = pitchData;
  }

  init() {
    const delayTime = this.#delay * (60 / this.#sequencer.getTempo());
    const durationTime = this.#duration * (60 / this.#sequencer.getTempo());
    if (Array.isArray(this.#midiPitchContent)) {
      this.#midiPitchContent.forEach((pitch) => {
        this.#sequencer
          .getSampler()
          .getSample(`midi-${pitch + this.#pitchData.getTonic()}`)
          .play(delayTime, durationTime);
      });
    }
    if (typeof this.#midiPitchContent === 'number') {
      this.#sequencer
        .getSampler()
        .getSample(
          `midi-${this.#midiPitchContent + this.#pitchData.getTonic()}`
        )
        .play(delayTime, durationTime);
    }
  }
}
