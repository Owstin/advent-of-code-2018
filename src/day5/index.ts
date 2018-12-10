import { FileUtil } from '../util/fileUtil';
import { PolymerReactor } from './polymerReactor';
import { join } from 'path';

const data = new FileUtil(join(__dirname, 'input.txt')).data.trim();

// part 1
// this one is slow (´･ω･`)
const reactor = new PolymerReactor(data);
console.log(reactor.length);

// part 2
// this one is really slow (´・ω・｀)
const numAlpha = 26;
const lowerA = 'a'.charCodeAt(0);
let smallestPolymer = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < numAlpha; i++) {
  console.log(`reducing polymer with ${String.fromCharCode(i + lowerA)} removed`)
  const polymer = new PolymerReactor(data, String.fromCharCode(i + lowerA));
  if (polymer.length < smallestPolymer) {
    smallestPolymer = polymer.length;
  }
}
console.log(smallestPolymer);
