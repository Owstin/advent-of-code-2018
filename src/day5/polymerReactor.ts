export class PolymerReactor {
  chain: string[] = [];
  index = 1;
  isForward = true;
  get length() {
    return this.chain.length;
  }

  constructor(chain: string, removedChar?: string) {
    this.chain = chain.split('');
    if (removedChar) {
      this.chain = this.chain.filter(val => !this.removedableChars(removedChar).includes(val));
    }
    this.reducePolymer();
  }

  removedableChars(char: string) {
    if (/[a-z]/.test(char)) {
      return [char, char.toUpperCase()];
    } else {
      return [char, char.toLowerCase()];
    }
  }

  reducePolymer() {
    while (this.index < this.chain.length) {
      if (this.isForward) {
        this.reduceForward();
      } else {
        this.reduceBackward();
      }
    }
  }

  reduceForward() {
    if (this.index < 1) {
      this.index = 1;
    }

    const left = this.chain[this.index - 1];
    const right = this.chain[this.index];
    if (this.canRemoveChain(left, right)) {
      this.chain.splice(this.index - 1, 2);
      this.isForward = false;
      return;
    }
    this.index++;
  }

  reduceBackward() {
    if (this.index < 1) {
      this.index = 1;
      this.isForward = true;
      return;
    }

    const left = this.chain[this.index - 1];
    const right = this.chain[this.index];
    if (this.canRemoveChain(left, right)) {
      this.chain.splice(this.index - 1, 2);
      this.isForward = true;
    }
    this.index--;
  }

  canRemoveChain(left: string, right: string) {
    const flippedLeft = this.changeCase(left);
    return flippedLeft === right;
  }

  changeCase(char: string): string {
    if (/[a-z]/.test(char)) {
      return char.toUpperCase();
    } else {
      return char.toLowerCase();
    }
  }
}
