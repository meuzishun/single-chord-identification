import { CheckBoxInput } from './components/checkbox-input.js';
import { chordData } from '../../musicModules/chord-data.js';
import { boundEventListeners } from '../bound-event-listeners.js';
import { interaction } from './interaction.js';
import { tonicControl } from './components/tonic-control.js';

export const settings = (function () {
  const settings = document.createElement('section');
  settings.classList.add('settings-section');

  const toggleSelectAll = function (e) {
    const title = e.target;
    const parent = title.parentElement;
    const settingsSection = parent.parentElement;
    const inputContainers = [...parent.children];
    inputContainers.shift();
    console.log(inputContainers);
    const inputs = inputContainers.map(
      (inputContainer) => inputContainer.children[0]
    );
    if (inputs.every((input) => input.checked)) {
      inputs.forEach((input) => {
        input.checked = false;
      });
    } else {
      inputs.forEach((input) => {
        input.checked = true;
      });
    }
    const checkedBoxes = [...settingsSection.querySelectorAll('input:checked')];
    interaction.renderBtns(checkedBoxes);
  };

  // Create all the checkboxes
  for (const [key, values] of Object.entries(chordData)) {
    const chordSubCategory = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = key.replace(/_/g, ' ');
    legend.addEventListener('click', toggleSelectAll);

    chordSubCategory.appendChild(legend);
    chordSubCategory.classList.add('chord-sub-category');
    chordSubCategory.classList.add(key);

    for (const key of Object.keys(values)) {
      const checkbox = new CheckBoxInput(
        key.replace(/_of_/g, '/').replace(/_/g, ' ').replace(/aug/, '+'),
        key,
        key,
        key
      );
      chordSubCategory.appendChild(checkbox);
    }

    settings.appendChild(chordSubCategory);
  }

  settings.appendChild(tonicControl.HTML);

  const handleSettingsChange = function (e) {
    const checkedBoxes = [...e.currentTarget.querySelectorAll('input:checked')];
    interaction.renderBtns(checkedBoxes);
  };

  settings.addEventListener(
    'change',
    (boundEventListeners.settingsChange = handleSettingsChange.bind(this))
  );

  return {
    HTML: settings,
  };
})();
