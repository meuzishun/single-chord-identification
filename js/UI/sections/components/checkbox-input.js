export class CheckBoxInput {
  #text;
  #id;
  #data;
  #input;
  #label;
  #container;

  constructor(text, id, data) {
    this.#text = text;
    this.#id = id;
    this.#data = data;
    this.#init();
    return this.#container;
  }

  #createHTML() {
    this.#container = document.createElement('div');
    this.#container.classList.add('checkbox-container');

    this.#input = document.createElement('input');
    this.#input.type = 'checkbox';
    this.#input.id = this.#id;

    this.#label = document.createElement('label');
    this.#label.textContent = this.#text;
    this.#label.setAttribute('for', this.#id);

    this.#container.appendChild(this.#input);
    this.#container.appendChild(this.#label);
  }

  #addData() {
    for (const [key, value] of Object.entries(this.#data)) {
      this.#input.dataset[key] = value;
    }
  }

  #init() {
    this.#createHTML();
    this.#addData();
  }
}
