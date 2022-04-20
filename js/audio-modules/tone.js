// Tones are the actual sound heard, created and connected in real time
export class Tone {
  #sampler;
  #soundBuffer;
  #volume;

  constructor(audioBuffer, sampler) {
    this.#sampler = sampler;
    this.#soundBuffer = this.#sampler.getAudioCtx().createBufferSource();
    this.#soundBuffer.buffer = audioBuffer;
    this.#volume = this.#sampler.getAudioCtx().createGain();
    this.#volume.gain.value = 0;
    this.#soundBuffer.connect(this.#volume).connect(this.#sampler.getGain());
  }

  start(delay) {
    const now = this.#sampler.getAudioCtx().currentTime;
    this.#soundBuffer.start(now + delay);
    this.#volume.gain.setTargetAtTime(1, now, 0.01);
  }

  stop(length) {
    const now = this.#sampler.getAudioCtx().currentTime;
    if (length) {
      this.#volume.gain.setTargetAtTime(0, now + length, 0.09);
      this.#soundBuffer.stop(now + length + 1);
    } else {
      this.#volume.gain.setTargetAtTime(0, now, 0.09);
      this.#soundBuffer.stop(now + 1);
    }
  }
}
