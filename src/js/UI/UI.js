import { header } from './sections/header.js';
import { settings } from './sections/settings.js';
import { interaction } from './sections/interaction.js';
import { footer } from './sections/footer.js';

export const UI = (function () {
  document.body.appendChild(header.HTML);
  document.body.appendChild(settings.HTML);
  document.body.appendChild(interaction.HTML);
  document.body.appendChild(footer.HTML);
})();
