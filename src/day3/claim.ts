export class Claim {
  private readonly claimRegex = /^#(\d+)\s+@\s(\d+),(\d+):\s(\d+)x(\d+)$/;
  number: number;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(private claimString: string) {
    [this.number, this.x, this.y, this.width, this.height] = this.parseString();
  }

  parseString() {
    const matches = this.claimString.match(this.claimRegex);
    if (matches) {
      matches.shift();
      return matches.map(val => Number(val));
    } else {
      return [];
    }
  }
}
