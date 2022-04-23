import { Sampler } from './sampler.js';
import { Sequencer } from './sequencer.js';

export const Piano = (function () {
  const sampler = new Sampler();
  const sequencer = new Sequencer(88, sampler);

  const loadPianoSamples = function () {
    sampler.setExpectedLoad(88);
    for (let i = 0; i < 88; i++) {
      sampler.addSample(`midi-${21 + i}`, `./audio/midi-piano-${21 + i}.mp3`);
    }
  };

  const mapNumberToSampleName = function (midi) {
    if (typeof midi === 'number') {
      return `midi-${midi}`;
    }
    if (Array.isArray(midi)) {
      return midi.map((item) => mapNumberToSampleName(item));
    }
  };

  loadPianoSamples();

  return {
    sampler,
    sequencer,
    mapNumberToSampleName,
  };
})();
