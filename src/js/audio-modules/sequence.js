import { AudioEvent } from './audio-event.js';

export class Sequence {
  #midiPitchData;
  #scheduleData;
  #sequencer;
  #audioEvents;

  constructor(midiPitchData, scheduleData, sequencer) {
    this.#midiPitchData = midiPitchData;
    this.#scheduleData = scheduleData;
    this.#sequencer = sequencer;
    this.#audioEvents = [];
  }

  #createAudioEvents() {
    //TODO: use scheduleData to calculate durations and delays
    const pitchContent = this.#midiPitchData.getMidiPitches();
    const durations = this.#scheduleData.getDurations(pitchContent.length);
    const delays = this.#scheduleData.getDelays(pitchContent.length);

    this.#midiPitchData.getMidiPitches().forEach((midiPitchContent, index) => {
      this.#audioEvents.push(
        new AudioEvent(
          midiPitchContent,
          durations[index],
          delays[index],
          this.#sequencer,
          this.#midiPitchData
        )
      );
    });
  }

  getMidiPitchData() {
    return this.#midiPitchData;
  }

  setMidiPitchData(midiPitchData) {
    this.#midiPitchData = midiPitchData;
  }

  getScheduleData() {
    return this.#scheduleData;
  }

  setScheduleData(scheduleData) {
    this.#scheduleData = scheduleData;
  }

  // Returns a promise that resolves once every tone in the sequence has stopped.
  start() {
    this.#audioEvents = [];
    this.#createAudioEvents();
    const tones = this.#audioEvents.flatMap((audioEvent) => audioEvent.init());
    return Promise.all(tones.map((tone) => tone.getEnded()));
  }

  getAudioEvents() {
    return this.#audioEvents;
  }
}
