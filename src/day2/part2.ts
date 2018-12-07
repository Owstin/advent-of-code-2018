import { readFileSync } from 'fs';
import { join } from 'path';

class CompareStrings {
  secretString: string | null = null;
  constructor(private strings: string[]) {}

  findSecretString() {
    for (const string of this.strings) {
      this.checkString(string);

      if (this.secretString !== null) {
        return;
      }
    }
  }

  checkString(checkString: string){
    for (const string of this.strings) {
      if (checkString === string) {
        break;
      }

      const reducedString = this.reduceString(checkString, string);
      if (reducedString.length === checkString.length - 1) {
        this.secretString = reducedString;
        return;
      }
    }
  }

  reduceString(checkString: string, string: string) {
    const split = checkString.split('');
    const filteredString = split.filter((char, i) => char === string.charAt(i));
    return filteredString.join('');
  }
}

const inputFile = 'input.txt';
const data = readFileSync(join(__dirname, inputFile), 'utf8').trim().split('\n');
const comparer = new CompareStrings(data);
comparer.findSecretString();
console.log(comparer.secretString);
