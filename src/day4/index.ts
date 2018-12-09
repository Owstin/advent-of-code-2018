import { FileUtil } from '../util/fileUtil';
import { join } from 'path';
import { GuardLog } from './guardLog';
import { GuardLogAnalyzer } from './guardLogAnalyzer';
import { GuardActivityAnalyzer } from './guardActivityAnalyzer';
import { GroupActivityAnalyzer } from './groupActivityAnalyzer';

const data = new FileUtil(join(__dirname, 'input.txt')).data.split('\n');
const guardData = data.map(val => new GuardLog(val));

// part 1
const analyzer = new GuardLogAnalyzer(guardData);
const sleepiest = analyzer.getSleepiestGuard();
const activityAnalyzer = new GuardActivityAnalyzer(sleepiest);
console.log(activityAnalyzer.sleepiestMinute * +activityAnalyzer.guardActivity.id);

// part 2
const groupAnalyzer = new GroupActivityAnalyzer(analyzer.groupedGuardLog);
console.log(groupAnalyzer.sleepiestMinute * +groupAnalyzer.sleepiestGuardId);
