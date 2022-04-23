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
    // this.#sampler.sampleLoadComplete(this);
    // console.log(`file ${this.#filepath} loaded`);
    // console.clear();
    // console.log(Object.keys(this.#sampler.getAllSamples()));
    // this.#sampler.incrementSampleCount();
    // console.log(this.#sampler.getSampleCount());
    // this.#sampler.checkLoadComplete();
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
