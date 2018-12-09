import { GuardActivity } from './guardActivity';

export class GuardActivityAnalyzer {
  private readonly minutesInHour = 60;
  private readonly sleepRegex = /falls asleep/;
  sleepFreq: number[] = new Array(this.minutesInHour);
  sleepiestMinute = 0;

  constructor(public guardActivity: GuardActivity) {
    for (let i = 0; i < this.minutesInHour; i++) {
      this.sleepFreq[i] = 0;
    }

    this.buildSleepFreq();
    this.findSleepiestMinute();
  }

  buildSleepFreq() {
    if (this.guardActivity) {
      let currentDay: number | null = null;
      let startMinute = 0;
      let endMinute = 0;
      this.guardActivity.activities.forEach(activity => {
        if (currentDay && activity.date.getDate() > currentDay || activity.date) {
          currentDay = activity.date.getDate();
        }

        if (this.sleepRegex.test(activity.message)) {
          startMinute = activity.date.getMinutes();
        } else {
          endMinute = activity.date.getMinutes() - 1;
          this.addSleepFreq(startMinute, endMinute);
        }
      });
    }
  }

  addSleepFreq(start: number, end: number) {
    for (let i = start; i <= end; i++) {
      this.sleepFreq[i]++;
    }
  }

  findSleepiestMinute() {
    this.sleepFreq.forEach((val, i) => {
      if (val > this.sleepFreq[this.sleepiestMinute]) {
        this.sleepiestMinute = i;
      }
    })
  }
}
