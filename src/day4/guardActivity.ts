import { IGuardLog } from './guardLog';

export class GuardActivity {
  private sleepRegex = /falls asleep/;
  private lastSleepDate: Date | null = null;
  activities: IGuardLog[] = [];
  sleepTime = 0;

  constructor(public id: string) {}

  addActivity(activity: IGuardLog) {
    this.activities.push(activity);
    if (this.sleepRegex.test(activity.message)) {
      this.lastSleepDate = activity.date;
    } else {
      this.calculateSleepTime(activity)
    }
  }

  private calculateSleepTime(activity: IGuardLog) {
    if (this.lastSleepDate) {
      this.sleepTime += (activity.date.valueOf() - this.lastSleepDate.valueOf());
    }
  }
}
