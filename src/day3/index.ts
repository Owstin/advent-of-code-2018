import { FileUtil } from '../util/fileUtil';
import { Claim } from './claim';
import { join } from 'path';
import { Fabric } from './fabric';

const filename = 'input.txt';
const data = new FileUtil(join(__dirname, filename)).data.split('\n');
const claims = data.map(val => new Claim(val));
const fabric = new Fabric(claims);

// part 1
fabric.printFabric();
console.log(fabric.overlaps);

// part 2
fabric.findUniqueClaims();
console.log(fabric.uniqueClaims);
