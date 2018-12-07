import { readFileSync } from 'fs';
import { join } from 'path';

const inputFile = 'input.txt';
const data = readFileSync(join(__dirname, inputFile), 'utf8');

const sum = data
  .trim()
  .split('\n')
  .reduce((sum: number, value: string): number => sum += parseInt(value), 0);

console.log(sum);
