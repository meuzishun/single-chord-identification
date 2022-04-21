export class CheckBoxInput {
  #text;
  #id;
  #name;
  #value;
  #input;
  #label;
  #container;

  constructor(text, id, name, value) {
    this.#text = text;
    this.#id = id;
    this.#name = name;
    this.#value = value;
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
  }

  #createLabel() {
    this.#label = document.createElement('label');
    this.#label.textContent = this.#text;
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
