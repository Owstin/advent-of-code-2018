import { IGuardLog } from './guardLog';
import { GuardActivity } from './guardActivity';

export interface GuardLogGroup {
  [key: string]: GuardActivity;
}

export class GuardLogAnalyzer {
  private readonly guardIdRegex = /^Guard #(\d+).+$/;
  groupedGuardLog: GuardLogGroup = {};

  constructor(public guardLog: IGuardLog[]) {
    this.sortGuardLog();
    this.groupActivities();
  }

  private sortGuardLog() {
    this.guardLog = this.guardLog.sort((a, b) => a.date < b.date ? -1 : 1);
  }

  groupActivities() {
    // activity list should always begin with a guard starting
    let currentId: string;
    this.guardLog.forEach(activity => {
      const hasGuardId = activity.message.match(this.guardIdRegex);
      if (hasGuardId) {
        [, currentId] = hasGuardId;
        if(!this.groupedGuardLog[currentId]) {
          this.groupedGuardLog[currentId] = new GuardActivity(currentId);
        }
      } else {
        this.groupedGuardLog[currentId].addActivity(activity);
      }
    });
  }

  getSleepiestGuard() {
    let sleepiestGuard = new GuardActivity('');
    Object.keys(this.groupedGuardLog).forEach(id => {
      if (
        !sleepiestGuard ||
        this.groupedGuardLog[id].sleepTime > sleepiestGuard.sleepTime
      ) {
        sleepiestGuard = this.groupedGuardLog[id];
      }
    });

    return sleepiestGuard;
  }
}
