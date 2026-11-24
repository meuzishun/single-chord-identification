export class CheckBoxInput {
  #text;
  #id;
  #name;
  #value;
  #input;
  #label;
  #container;
  #data;

  // `labelHTML` is static, author-controlled markup (see chord-data.js).
  constructor(labelHTML, id, name, value, data = {}) {
    this.#text = labelHTML;
    this.#id = id;
    this.#name = name;
    this.#value = value;
    this.#data = data;
    this.#init();
    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('checkbox-input');
  }

  #createInput() {
    this.#input = document.createElement('input');
    this.#input.type = 'checkbox';
    this.#input.id = this.#id;
    this.#input.name = this.#name;
    this.#input.value = this.#value;
    for (const [key, value] of Object.entries(this.#data)) {
      this.#input.dataset[key] = value;
    }
  }

  #createLabel() {
    this.#label = document.createElement('label');
    this.#label.innerHTML = this.#text;
    this.#label.setAttribute('for', this.#id);
  }

  #createHTML() {
    this.#createContainer();
    this.#createInput();
    this.#createLabel();
    this.#container.appendChild(this.#input);
    this.#container.appendChild(this.#label);
  }

  #init() {
    this.#createHTML();
  }
}
