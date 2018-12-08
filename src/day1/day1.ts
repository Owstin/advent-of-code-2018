import { readFileSync } from 'fs';
import { join } from 'path';

const inputFile = 'input.txt';
let data = readFileSync(join(__dirname, inputFile), 'utf8')
  .split('\n')
  .map(val => parseInt(val));

// part 1
const sum = data.reduce((sum, value) => sum += value, 0);
console.log(sum);

// part 2
const previousFreqs: number[] = [];
let currentFreq = 0;
for (let i = 0, n = data.length;; i++) {
  currentFreq += data[i % n];
  if (previousFreqs.indexOf(currentFreq) !== -1) {
    console.log(currentFreq)
    break;
  } else {
    previousFreqs.push(currentFreq);
  }
}
