import { readFileSync } from 'fs';
import { join } from 'path';

class ChecksumCalculator {
  doubles = 0;
  triples = 0;
  checksum: number | null = null;

  countOccurrences(char: string, str: string) {
    const filteredString = str.split('').filter(val => val === char);
    return filteredString.length;
  }

  checkString(str: string) {
    let hasDouble = false;
    let hasTriple = false;

    for (const c of str) {
      const occurrences = this.countOccurrences(c, str);
      if (occurrences === 2) {
        hasDouble = true;
      }
      if (occurrences === 3) {
        hasTriple = true;
      }
    }

    this.doubles += hasDouble ? 1 : 0;
    this.triples += hasTriple ? 1 : 0;
  }

  calculateChecksum(strings: string[]) {
    strings.forEach(string => this.checkString(string));

    this.checksum = this.doubles * this.triples;
  }
}

const inputFile = 'input.txt';
const data = readFileSync(join(__dirname, inputFile), 'utf8').trim().split('\n');
const checksumCalculator = new ChecksumCalculator();

checksumCalculator.calculateChecksum(data);
console.log(checksumCalculator.checksum);
