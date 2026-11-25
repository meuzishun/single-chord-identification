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
    const pitches = Array.isArray(this.#midiPitchContent)
      ? this.#midiPitchContent
      : [this.#midiPitchContent];
    return pitches.map((pitch) =>
      this.#sequencer
        .getSampler()
        .getSample(`midi-${pitch + this.#pitchData.getTonic()}`)
        .play(delayTime, durationTime)
    );
  }
}
