export class ScheduleData {
  #pattern;
  #type;
  #final;

  constructor(pattern, type, final = undefined) {
    if (Array.isArray(pattern)) {
      this.#pattern = pattern;
    } else {
      throw new Error('pattern must be an array');
    }
    if (type === 'repeat' || type === 'hold') {
      this.#type = type;
    } else {
      throw new Error("type must be either 'repeat' or 'hold'");
    }
    if (final && typeof final !== 'number') {
      throw new Error('final value must be a number');
    } else {
      this.#final = final;
    }
  }

  getPattern() {
    return this.#pattern;
  }

  setPattern(pattern) {
    this.#pattern = pattern;
  }

  getType() {
    return this.#type;
  }

  setType(type) {
    this.#type = type;
  }

  getFinal() {
    return this.#final;
  }

  setFinal(final) {
    this.#final = final;
  }

  getDurations(length) {
    //! bug with type 'repeat' and one item in 'pattern'
    const arr = [];
    for (let i = 0; i < length; i++) {
      if (i === length - 1 && this.#final) {
        arr.push(this.#final);
      } else if (this.#type === 'repeat') {
        arr.push(this.#pattern[i % 2]);
      } else if (this.#type === 'hold' && i > this.#pattern.length - 1) {
        arr.push(this.#pattern[this.#pattern.length - 1]);
      } else {
        arr.push(this.#pattern[i]);
      }
    }
    return arr;
  }

  getDelays(length) {
    //TODO: There must be a way of using reduce here
    const arr = [];
    const durations = this.getDurations(length);
    let currentDuration = 0;
    arr.push(currentDuration);
    for (let i = 0; i < length - 1; i++) {
      currentDuration += durations[i];
      arr.push(currentDuration);
    }
    return arr;
  }
}
