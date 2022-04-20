import { CheckBoxInput } from './components/checkbox-input.js';

export const settings = (function () {
  const settings = document.createElement('section');
  settings.classList.add('settings-section');

  const testCheckbox = new CheckBoxInput('Test checkbox', 'testID', {
    test: 'testing',
  });

  settings.appendChild(testCheckbox);

  return settings;
})();
