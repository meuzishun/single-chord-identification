import { CheckBoxInput } from './components/checkbox-input.js';
import { chordData } from '../../../chord-data.js';
import { boundEventListeners } from '../bound-event-listeners.js';
import { interaction } from './interaction.js';

export const settings = (function () {
  const settings = document.createElement('section');
  settings.classList.add('settings-section');

  // Create all the checkboxes
  for (const [key, values] of Object.entries(chordData)) {
    const chordSubCategory = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = key.replace(/_/g, ' ');

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
