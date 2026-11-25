import { Button } from './components/button.js';
import { chordData, chordId, renderLabel } from '../../musicModules/chord-data.js';
import { boundEventListeners } from '../bound-event-listeners.js';
import { chords } from '../../musicModules/chords.js';
import { Piano } from '../../audio-modules/piano-instrument.js';
import { ScheduleData } from '../../audio-modules/schedule-data.js';
import { PitchData } from '../../audio-modules/pitch-data.js';
import { tonicControl } from './components/tonic-control.js';
import { footer } from './footer.js';

export const interaction = (function () {
  const interaction = document.createElement('section');
  interaction.classList.add('interaction-section');

  const answerBtns = document.createElement('div');
  answerBtns.classList.add('answer-btns');

  const otherBtns = document.createElement('div');
  otherBtns.classList.add('other-btns');

  interaction.appendChild(otherBtns);
  interaction.appendChild(answerBtns);

  const addButton = function (text, cls, data) {
    const btn = new Button(text, cls, data);
    answerBtns.appendChild(btn);
  };

  const removeButton = function (button) {};

  const clearBtns = function () {
    answerBtns.textContent = '';
  };

  const registerSelectedBox = function (box) {
    const { category } = box.dataset;
    const key = box.value;
    const { label, midi } = chordData[category][key];
    const id = chordId(category, key);

    addButton(renderLabel(label), 'chordBtn', { chord: id, category });

    chords.addChord(id, category, midi);
  };

  const renderBtns = function (checkedBoxes) {
    console.log(checkedBoxes);
    clearBtns();
    chords.clearChoices();
    checkedBoxes.forEach((box) => registerSelectedBox(box));
  };

  const createRandomChordBtn = function () {
    const randomChordBtn = document.createElement('button');
    randomChordBtn.classList.add('random-chord-btn');
    randomChordBtn.textContent = 'Play random chord';
    otherBtns.appendChild(randomChordBtn);
  };

  const createPlayAgainBtn = function () {
    const playAgainBtn = document.createElement('button');
    playAgainBtn.classList.add('play-again-btn');
    playAgainBtn.textContent = 'Hear again';
    otherBtns.appendChild(playAgainBtn);
  };

  const createTonicizationBtn = function () {
    const tonicizationBtn = document.createElement('button');
    tonicizationBtn.classList.add('play-tonicization-btn');
    tonicizationBtn.textContent = 'Play tonicization progression';
    otherBtns.appendChild(tonicizationBtn);
  };

  const getRandomOffset = function (offset) {
    if (typeof offset !== 'number') {
      throw Error('Offset must be a number');
    }
    return Math.floor(Math.random() * 12) + offset;
  };

  const interpretTonicSelection = function () {
    let val = tonicControl.getSelection();
    return val === 'random' ? getRandomOffset(57) : val;
  };

  createRandomChordBtn();
  createPlayAgainBtn();
  createTonicizationBtn();

  let answer = undefined;
  let tonic = interpretTonicSelection();
  const longHold = new ScheduleData([4], 'hold');
  const constantWithLongFinal = new ScheduleData([1], 'hold', 4);

  Piano.sequencer.addSequence(
    'major-tonicizing-progression',
    new PitchData(chords.majorTonicizingProgression, tonic),
    constantWithLongFinal
  );
  Piano.sequencer.addSequence(
    'minor-tonicizing-progression',
    new PitchData(chords.minorTonicizingProgression, tonic),
    constantWithLongFinal
  );

  // Disable the play buttons until the given playback finishes, so a sequence
  // can't be started again (or layered with another) while one is sounding.
  const playWithBtnsDisabled = async function (playback) {
    const playBtns = otherBtns.querySelectorAll('button');
    playBtns.forEach((btn) => (btn.disabled = true));
    try {
      await playback();
    } finally {
      playBtns.forEach((btn) => (btn.disabled = false));
    }
  };

  const handleBtnClick = function (e) {
    if (e.target.classList.contains('random-chord-btn')) {
      tonic = interpretTonicSelection();
      footer.clearFeedback();
      const { chord, id, mode } = chords.getRandomChoice();
      answer = id;
      console.log({ answer, mode });
      if (mode === 'major') {
        Piano.sequencer.addSequence(
          'tonicizing-progression',
          new PitchData(chords.majorTonicizingProgression, tonic),
          constantWithLongFinal
        );
      }
      if (mode === 'minor') {
        Piano.sequencer.addSequence(
          'tonicizing-progression',
          new PitchData(chords.minorTonicizingProgression, tonic),
          constantWithLongFinal
        );
      }
      const voicings = chord.getVoicings();
      const randomVoicing =
        voicings[Math.floor(Math.random() * voicings.length)];
      console.log(randomVoicing);
      const pitchData = new PitchData([randomVoicing], tonic);
      Piano.sequencer.addSequence('random-choice', pitchData, longHold);

      playWithBtnsDisabled(async () => {
        await Piano.sequencer.playSequence('tonicizing-progression');
        await Piano.sequencer.playSequence('random-choice');
      });
      return;
    }
    if (e.target.classList.contains('play-again-btn')) {
      console.log('The play again button was clicked');
      playWithBtnsDisabled(() => Piano.sequencer.playSequence('random-choice'));
    }
    if (e.target.classList.contains('play-tonicization-btn')) {
      playWithBtnsDisabled(() =>
        Piano.sequencer.playSequence('tonicizing-progression')
      );
    }
    // Labels contain <sup> etc., so the click target may be a child element.
    const chordBtn = e.target.closest('.chordBtn');
    if (chordBtn) {
      console.log(`The ${chordBtn.dataset.chord} button was clicked.`);
      if (chordBtn.dataset.chord === answer) {
        footer.createFeedbackMsg('Correct!');
      } else {
        footer.createFeedbackMsg('Try again...');
      }
    }
  };

  interaction.addEventListener(
    'click',
    (boundEventListeners.btnClick = handleBtnClick.bind(this))
  );

  return {
    HTML: interaction,
    registerSelectedBox,
    renderBtns,
  };
})();
