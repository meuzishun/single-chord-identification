export class Button {
  #text;
  #cls;
  #data;
  #elem;

  constructor(text, cls, data) {
    this.#text = text;
    this.#cls = cls;
    this.#data = data;
    this.#init();
    return this.#elem;
  }

  #createHTML() {
    this.#elem = document.createElement('button');
    this.#elem.textContent = this.#text;
  }

  #addClasses() {
    this.#cls.split(' ').forEach((cl) => {
      this.#elem.classList.add(cl.replace(/,/g, ''));
    });
  }

  #addData() {
    for (const [key, value] of Object.entries(this.#data)) {
      this.#elem.dataset[key] = value;
    }
  }

  #init() {
    this.#createHTML();
    this.#addClasses();
    this.#addData();
  }
}
