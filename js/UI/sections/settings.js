import { CheckBoxInput } from './components/checkbox-input.js';

export const settings = (function () {
  const settings = document.createElement('section');
  settings.classList.add('settings-section');

  const chordLists = {
    major_secondary_dominants: {
      V7_of_V: {},
      V7_of_IV: {},
      V7_of_vi: {},
      V7_of_ii: {},
      V7_of_iii: {},
    },
    minor_secondary_dominants: {
      V7_of_V: {},
      V7_of_iv: {},
      V7_of_III: {},
      V7_of_VI: {},
      V7_of_VII: {},
    },
    modal_borrowing_1: {
      iv: {},
      iiº6: {},
      viiº7: {},
    },
    modal_borrowing_2: {
      bIII: {},
      bVI: {},
      bVII: {},
    },
    chromatic_predominants: {
      N6: {},
      It_aug6th: {},
      Fr_aug6th: {},
      Gr_aug6th: {},
    },
    altered_dominants: {
      Vaug: {},
      Vsub6: {},
      V7sub6: {},
    },
  };

  for (const [key, values] of Object.entries(chordLists)) {
    const chordSubCategory = document.createElement('div');
    chordSubCategory.classList.add('chord-sub-category');
    chordSubCategory.classList.add(key);

    for (const [key, value] of Object.entries(values)) {
      const checkbox = new CheckBoxInput(key, key, key, key);
      chordSubCategory.appendChild(checkbox);
    }

    settings.appendChild(chordSubCategory);
  }

  return {
    HTML: settings,
  };
})();
