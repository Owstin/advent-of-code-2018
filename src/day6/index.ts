import { FileUtil } from '../util/fileUtil';
import { join } from 'path';
import { Grid } from './grid';
import { ChronalCoordinates } from './chronalCoordinates';

const data = new FileUtil(join(__dirname, 'input.txt')).data.split('\n');
const grid = new Grid();
new ChronalCoordinates(data, grid);
