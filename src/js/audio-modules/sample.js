import { Tone } from './tone.js';

// Samples are the audio files read and loaded in advance
export class Sample {
  #filepath;
  #sampler;
  #audioBuffer;

  constructor(filepath, sampler) {
    this.#filepath = filepath;
    this.#sampler = sampler;
    this.#loadAudioFile();
  }

  async #loadAudioFile() {
    const response = await fetch(this.#filepath);
    const arrayBuffer = await response.arrayBuffer();
    this.#audioBuffer = await this.#sampler
      .getAudioCtx()
      .decodeAudioData(arrayBuffer);
  }

  play(delay = 0, duration) {
    const sound = new Tone(this.#audioBuffer, this.#sampler);
    sound.start(delay);

    if (duration) {
      sound.stop(delay + duration);
    }
    return sound;
  }
}
