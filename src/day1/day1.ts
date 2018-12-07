import { readFileSync } from 'fs';
import { join } from 'path';

const inputFile = 'input.txt';
const data = readFileSync(join(__dirname, inputFile), 'utf8');

const sum = data
  .split('\n')
  .filter(val => val.length > 0)
  .reduce((sum: number, value: string): number => sum += parseInt(value), 0);

console.log(sum);
