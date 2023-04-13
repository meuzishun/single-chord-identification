import { boundEventListeners } from '../../bound-event-listeners.js';

export const tonicControl = (function () {
  const container = document.createElement('div');
  container.classList.add('tonic-container');

  const tonicLabel = document.createElement('label');
  tonicLabel.classList.add('tonic-label');
  tonicLabel.setAttribute('for', 'tonic');
  tonicLabel.textContent = 'Tonic:';

  const tonicSelection = document.createElement('select');
  tonicSelection.classList.add('tonic-selection');
  tonicSelection.setAttribute('name', 'tonic');

  const values = {
    C: 60,
    C_sharp: 61,
    D: 62,
    E_flat: 63,
    E: 64,
    F: 65,
    F_sharp: 66,
    G: 67,
    A_flat: 68,
    A: 57,
    B_flat: 58,
    B: 59,
    random: 'random',
  };

  for (const [key, value] of Object.entries(values)) {
    const option = document.createElement('option');
    option.classList.add('tonic-option');
    option.value = value;
    option.textContent = key.replace(/_/g, ' ');
    if (value === 60) {
      option.selected = 'selected';
    }
    tonicSelection.appendChild(option);
  }

  let selection = 60;

  const changeSelection = function (e) {
    if (e.target.selectedOptions[0].value === 'random') {
      selection = 'random';
    } else {
      selection = Number(e.target.selectedOptions[0].value);
    }
  };

  const getSelection = function () {
    return selection;
  };

  tonicSelection.addEventListener(
    'change',
    (boundEventListeners.tonicChange = changeSelection.bind(this))
  );

  container.appendChild(tonicLabel);
  container.appendChild(tonicSelection);

  return {
    HTML: container,
    getSelection,
  };
})();
