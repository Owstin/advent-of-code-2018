import { Claim } from './claim';

export class Fabric {
  sheetWidth = 0;
  sheetHeight = 0;
  sheet: string[][] = [[]];

  overlaps = 0;
  uniqueClaims: Claim[] = [];

  constructor(private claims: Claim[]) {
    this.claims.forEach(claim => {
      this.plotClaim(claim);
    });
  }

  private plotClaim(claim: Claim) {
    if (
      claim.x + claim.width > this.sheetWidth ||
      claim.y + claim.height > this.sheetHeight
    ) {
      this.expandSheet(claim);
    }
    this.markClaim(claim);
  }

  /**
   * The sheet size isn't known upfront
   * so it will need to expand to fit claims that exceed the current size
   */
  private expandSheet(claim: Claim) {
    // expand horizontally
    if (claim.x + claim.width > this.sheetWidth) {
      for (let i = 0; i < this.sheetHeight; i++) {
        const sheetRow = this.sheet[i].concat(this.generateEmptyRow(claim.x + claim.width - this.sheetWidth));
        this.sheet[i] = sheetRow;
      }
      this.sheetWidth = claim.x + claim.width;
    }

    // expand vertcally
    if (claim.y + claim.height > this.sheetHeight) {
      for (let i = 0; i < claim.y + claim.height - this.sheetHeight; i++) {
        this.sheet[this.sheetHeight + i] = this.generateEmptyRow(this.sheetWidth);
      }
      this.sheetHeight = claim.y + claim.height;
    }
  }

  private markClaim(claim: Claim) {
    for (let row = 0; row < claim.height; row++) {
      for (let col = 0; col < claim.width; col++) {
        const patch = this.sheet[row + claim.y][col + claim.x];

        if (patch === '') {
          this.sheet[row + claim.y][col + claim.x] = 'x';
        }
        else if (patch === 'x') {
          this.sheet[row + claim.y][col + claim.x] = 'o';
          this.overlaps++;
        }
      }
    }
  }

  private generateEmptyRow(size: number): string[] {
    const array = new Array(size);
    for (let i = 0; i < size; i++) {
      array[i] = '';
    }
    return array;
  }

  printFabric() {
    for (let row = 0; row < this.sheetHeight; row++) {
      console.log(this.sheet[row].map(val => val === '' ? '_' : val).join(' '))
    }
  }

  findUniqueClaims() {
    this.claims.forEach(claim => {
      for (let row = 0; row < claim.height; row++) {
        for (let col = 0; col < claim.width; col++) {
          if (this.sheet[claim.y + row][claim.x + col] === 'o') {
            return;
          }
        }
      }

      this.uniqueClaims.push(claim);
    });
  }
}
