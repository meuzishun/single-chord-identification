import { Sample } from './sample.js';

// Samplers create the audio context and can store and remove samples
export class Sampler {
  #audioCtx;
  #samplerGain;
  #samples;
  #sampleCount;
  #expectedLoad;

  constructor() {
    this.#audioCtx = new AudioContext();
    this.#samplerGain = this.#audioCtx.createGain();
    this.#samplerGain.connect(this.#audioCtx.destination);
    this.#samples = {};
    this.#sampleCount = 0;
  }

  getAudioCtx() {
    return this.#audioCtx;
  }

  getGain() {
    return this.#samplerGain;
  }

  setGain(value) {
    this.#samplerGain = value;
  }

  async addSample(name, filepath) {
    this.#samples[name] = new Sample(filepath, this);
  }

  sampleLoadComplete(sample) {
    console.log(sample);
  }

  incrementSampleCount() {
    this.#sampleCount++;
  }

  getSampleCount() {
    return this.#sampleCount;
  }

  setExpectedLoad(size) {
    this.#expectedLoad = size;
  }

  checkLoadComplete() {
    return this.#sampleCount === this.#expectedLoad;
  }

  getSample(name) {
    return this.#samples[name];
  }

  getAllSamples() {
    return this.#samples;
  }

  removeSample(name) {
    delete this.#samples[name];
  }

  clearAllSamples() {
    this.#samples = {};
  }
}
