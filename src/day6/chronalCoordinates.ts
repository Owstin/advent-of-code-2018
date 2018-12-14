import { Coordinate } from './coordinate';
import { Grid } from './grid';

export class ChronalCoordinates {
  coordinates: Coordinate[] = [];
  invalids: number[] = []
  constructor(private rawCoordinates: string[], public grid: Grid) {
    this.parseCoords();
    this.coordinates.forEach((coord, i) =>
      this.grid.addCoordinate(coord, i.toString())
    );
    this.expandCoordinates();
    this.findInfinites();
    this.findLargestArea();
    this.under10000();
    // this.grid.printGrid();
  }

  parseCoords() {
    const coordRegex = /^(\d+), (\d+)$/;
    this.rawCoordinates.forEach((coordString, i) => {
      const match = coordString.match(coordRegex);
      if (match) {
        match.shift();
        const [x, y] = match;
        this.coordinates[i] = new Coordinate(+x, +y);
      }
    });
  }

  expandCoordinates() {
    for (let y = 0; y < this.grid.gridY; y++) {
      for (let x = 0; x < this.grid.gridX; x++) {
        const currCoordinate = new Coordinate(x, y);
        const closestPoint = this.calulateShortestDisance(currCoordinate);
        if (closestPoint !== null) {
          this.grid.addCoordinate(currCoordinate, closestPoint.toString());
        }
      }
    }
  }

  calulateShortestDisance(coordinate: Coordinate): number | null {
    const distances = this.coordinates.map(val => this.calculateDistance(coordinate, val));
    let shortestIndex = 0;
    let overlaps = 0;
    for (let i = 1; i < distances.length; i++) {
      if (distances[i] < distances[shortestIndex]) {
        shortestIndex = i;
        overlaps = 0;
      } else if (distances[i] === distances[shortestIndex]) {
        overlaps++;
      }
    }

    return !overlaps ? shortestIndex : null;
  }

  calculateDistance(coordinateA: Coordinate, coorinateB: Coordinate) {
    return Math.abs(coordinateA.x - coorinateB.x) + Math.abs(coordinateA.y - coorinateB.y);
  }

  findInfinites() {
    const infinites = new Set<number>();
    for (let x = 0; x < this.grid.gridX; x++) {
      const top = parseInt(this.grid.grid[0][x]);
      const bottom = parseInt(this.grid.grid[this.grid.gridY - 1][x]);
      if (+top >= 0) {
        infinites.add(top);
      }
      if (+bottom >= 0) {
        infinites.add(bottom);
      }
    }

    for (let y = 1; y < this.grid.gridY - 2; y++) {
      const left = parseInt(this.grid.grid[y][0]);
      const right = parseInt(this.grid.grid[y][this.grid.gridX - 1]);
      if (+left >= 0) {
        infinites.add(left);
      }
      if (+right >= 0) {
        infinites.add(right);
      }
    }

    this.invalids = Array.from(infinites);
  }

  findLargestArea() {
    const sums = new Array(this.coordinates.length).fill(0);
    for (let y = 0; y < this.grid.gridY; y++) {
      for (let x = 0; x < this.grid.gridX; x++) {
        const value = parseInt(this.grid.grid[y][x]);
        if (value >= 0 && !this.invalids.includes(value)) {
          sums[value] = sums[value] + 1;
        }
      }
    }

    let largestIndex = 0;
    for (let i = 0; i < sums.length; i++) {
      if (sums[i] > sums[largestIndex]) {
        largestIndex = i;
      }
    }
    console.log(sums[largestIndex]);
  }

  distanceToAllCoords(coordinate: Coordinate) {
    return this.coordinates.reduce((accum, curr): number => accum + this.calculateDistance(coordinate, curr), 0);
  }

  under10000() {
    let sum = 0;
    for (let y = 0; y < this.grid.gridY; y++) {
      for (let x = 0; x < this.grid.gridX; x++) {
        const coord = new Coordinate(x, y);
        if (this.distanceToAllCoords(coord) < 10000) {
          sum++;
        }
      }
    }

    console.log(sum);
  }
}
