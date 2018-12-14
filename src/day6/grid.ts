import { Coordinate } from './coordinate';

export class Grid {
  gridX = 1;
  gridY = 1;
  grid: string[][] = [['']];

  addCoordinate(coordinate: Coordinate, value: string) {
    if (coordinate.x >= this.gridX || coordinate.y >= this.gridY) {
      this.expandGrid(coordinate);
    }

    this.grid[coordinate.y][coordinate.x] = value;
  }

  printGrid() {
    for (let i = 0; i < this.gridY; i++) {
      console.log(this.grid[i].map(val => val === '' ? '.' : val).join(' '));
    }
  }

  private expandGrid(coordinate: Coordinate) {
    const x = coordinate.x + 1;
    const y = coordinate.y + 1;
    if (x > this.gridX) {
      for (let i = 0; i < this.gridY; i++) {
        const gridRow = this.grid[i].concat(this.generateEmptyRow(x - this.gridX));
        this.grid[i] = gridRow;
      }
      this.gridX = x;
    }

    if (y > this.gridY) {
      for (let i = 0; i < y - this.gridY; i++) {
        this.grid[this.gridY + i] = this.generateEmptyRow(this.gridX);
      }
      this.gridY = y;
    }
  }

  private generateEmptyRow(size: number) {
    return new Array(size).fill('');
  }
}
