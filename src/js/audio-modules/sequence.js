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
    // this.#createAudioEvents();
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

  start() {
    this.#audioEvents = [];
    this.#createAudioEvents();
    this.#audioEvents.forEach((audioEvent) => audioEvent.init());
  }

  getAudioEvents() {
    return this.#audioEvents;
  }
}
