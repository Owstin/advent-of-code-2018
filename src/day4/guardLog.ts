export interface IGuardLog {
  date: Date;
  message: string;
}

export class GuardLog implements IGuardLog {
  private readonly guardLogRegex = /^\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (.+)$/;
  date: Date;
  message: string;

  constructor(private guardLog: string) {
    const [year, month, day, hour, minute, message] = this.parseGuardLog();
    this.date = new Date(+year, +month, +day, +hour, +minute);
    this.message = message;
  }

  parseGuardLog() {
    const match = this.guardLog.match(this.guardLogRegex);
    if (match) {
      match.shift();
      return match;
    } else {
      return [];
    }
  }

  toString() {
    return `[${this.date.toISOString()}] ${this.message}`
  }
}
