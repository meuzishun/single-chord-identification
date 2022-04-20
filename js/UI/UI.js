import { header } from './sections/header.js';
import { settings } from './sections/settings.js';
import { interaction } from './sections/interaction.js';
import { footer } from './sections/footer.js';

export const UI = (function () {
  document.body.appendChild(header);
  document.body.appendChild(settings);
  document.body.appendChild(interaction);
  document.body.appendChild(footer);
})();
