import { GuardLogGroup } from './guardLogAnalyzer';

interface GuardActivityMinute {
  [key: string]: number;
}

export class GroupActivityAnalyzer {
  private readonly sleepRegex = /falls asleep/;
  private readonly minutesInHour = 60;
  sleepFreqs: GuardActivityMinute[] = new Array(this.minutesInHour);
  sleepiestMinute = 0;
  sleepiestGuardId = '';
  sleepiestGuardCount = 0;

  constructor(public groupedActivites: GuardLogGroup) {
    for (let i = 0; i < this.minutesInHour; i++) {
      this.sleepFreqs[i] = {}
    }
    this.buildSleepFreq();
    this.findSleepiestMinute();
  }

  buildSleepFreq() {
    Object.keys(this.groupedActivites).forEach(id => {
      this.processActivitiesById(id);
    });
  }

  processActivitiesById(id: string) {
    const activities = this.groupedActivites[id].activities;
    let currentDay: number | null = null;
    let startMinute = 0;
    let endMinute = 0;
    activities.forEach(activity => {
      if (currentDay && activity.date.getDate() > currentDay || activity.date && currentDay === null) {
        currentDay = activity.date.getDate();
      }

      if (this.sleepRegex.test(activity.message)) {
        startMinute = activity.date.getMinutes();
      } else {
        endMinute = activity.date.getMinutes() - 1;
        this.addSleepFreq(id, startMinute, endMinute);
      }
    })
  }

  addSleepFreq(id: string, startMinute: number, endMinute: number) {
    for (let i = startMinute; i <= endMinute; i++) {
      this.sleepFreqs[i] = this.updateFreq(id, i);
    }
  }

  updateFreq(id: string, index: number) {
    const currentFreq = this.sleepFreqs[index];
    if (!currentFreq[id]) {
      currentFreq[id] = 1;
    } else {
      currentFreq[id]++;
    }

    return currentFreq;
  }

  findSleepiestMinute() {
    this.sleepFreqs.forEach((freq, i) => {
      Object.keys(freq).forEach(id => {
        if (freq[id] > this.sleepiestGuardCount) {
          this.sleepiestGuardId = id;
          this.sleepiestGuardCount = freq[id];
          this.sleepiestMinute = i;
        }
      });
    })
  }
}
