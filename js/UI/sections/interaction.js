import { Button } from './components/button.js';
import { chordData } from '../../../chord-data.js';
import { boundEventListeners } from '../bound-event-listeners.js';
import { chords } from '../../musicModules/chords.js';
import { Piano } from '../../audio-modules/piano-instrument.js';
import { ScheduleData } from '../../audio-modules/schedule-data.js';
import { PitchData } from '../../audio-modules/pitch-data.js';
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

  const clearBtns = function () {
    answerBtns.textContent = '';
  };

  const renderBtns = function (checkedBoxes) {
    clearBtns();
    chords.clearChoices();
    checkedBoxes.forEach((box) => {
      const category = box.parentElement.parentElement.classList[1];
      const btnText = box.id.replace(/_of_/g, '/');
      const btnClasses = `chordBtn, ${box.value}`;
      const btnData = box.value;

      addButton(btnText, btnClasses, { chord: btnData, category });

      chords.addChord(category, btnData, chordData[category][btnData].midi);
    });
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

  createRandomChordBtn();
  createPlayAgainBtn();
  createTonicizationBtn();

  let answer = undefined;

  const longHold = new ScheduleData([4], 'hold');
  const constantWithLongFinal = new ScheduleData([1], 'hold', 4);

  Piano.sequencer.addSequence(
    'major-tonicizing-progression',
    new PitchData(chords.majorTonicizingProgression, 60),
    constantWithLongFinal
  );
  Piano.sequencer.addSequence(
    'minor-tonicizing-progression',
    new PitchData(chords.minorTonicizingProgression, 60),
    constantWithLongFinal
  );

  const getRandomVoicing = function () {
    const chord = chords.getRandomChoice();
    const voicings = chord.getVoicings();
    return voicings[Math.floor(Math.random() * voicings.length)];
  };

  const handleBtnClick = function (e) {
    if (e.target.classList.contains('random-chord-btn')) {
      footer.clearFeedback();
      const { chord, key } = chords.getRandomChoice();
      console.log(key);
      answer = key;
      const category = chords.findCategory(key);
      if (category === 'majorOnly') {
        // Piano.sequencer.playSequence('major-tonicizing-progression');
        Piano.sequencer.addSequence(
          'tonicizing-progression',
          new PitchData(chords.majorTonicizingProgression, 60),
          constantWithLongFinal
        );
      }
      if (category === 'minorOnly') {
        // Piano.sequencer.playSequence('minor-tonicizing-progression');
        Piano.sequencer.addSequence(
          'tonicizing-progression',
          new PitchData(chords.minorTonicizingProgression, 60),
          constantWithLongFinal
        );
      }
      const voicings = chord.getVoicings();
      const randomVoicing =
        voicings[Math.floor(Math.random() * voicings.length)];
      console.log(randomVoicing);
      const pitchData = new PitchData([randomVoicing], 60);
      Piano.sequencer.addSequence('random-choice', pitchData, longHold);

      Piano.sequencer.playSequence('tonicizing-progression');
      const chordTimer = setTimeout(() => {
        Piano.sequencer.playSequence('random-choice');
      }, 5000);
      return;
    }
    if (e.target.classList.contains('play-again-btn')) {
      console.log('The play again button was clicked');
      Piano.sequencer.playSequence('random-choice');
    }
    if (e.target.classList.contains('play-tonicization-btn')) {
      Piano.sequencer.playSequence('tonicizing-progression');
    }
    if (e.target.classList.contains('chordBtn')) {
      console.log(
        `The ${e.target.dataset.chord} button in the ${e.target.dataset.category} category was clicked.`
      );
      console.log(e.target.dataset.chord === answer);
      if (e.target.dataset.chord === answer) {
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
    renderBtns,
  };
})();
