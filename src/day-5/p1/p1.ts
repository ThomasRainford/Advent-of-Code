import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-5/p1/sample.txt", "utf8")
    .split("\n")
    .map((row) =>
      row.split(" -> ").map((c) => c.split(",").map((n) => parseInt(n)))
    );

  data = data.filter((row) => {
    const x1 = row[0][0];
    const x2 = row[1][0];
    const y1 = row[0][1];
    const y2 = row[1][1];
    return x1 === x2 || y1 === y2;
  });

  return data;
};

export const p1 = () => {
  const data = readInput();
  let coords: number[][] = [];
  data.forEach((line) => {
    line.forEach((c) => coords.push(c));
  });

  const SIZE = 10;

  const grid: number[][] = [];

  for (let i = 0; i < SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < SIZE; j++) {
      grid[i][j] = 0;
    }
  }

  for (let rowi = 0; rowi < data.length; rowi++) {
    const row = data[rowi];
    const x1 = row[0][0];
    const x2 = row[1][0];
    const y1 = row[0][1];
    const y2 = row[1][1];
    if (x1 === x2) {
      for (let yi = Math.min(y1, y2); yi <= Math.max(y1, y2); yi++) {
        grid[x1][yi]++;
      }
    } else if (y1 === y2) {
      for (let xi = Math.min(x1, x2); xi <= Math.max(x1, x2); xi++) {
        grid[xi][y1]++;
      }
    }
  }

  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] >= 2) {
        count++;
      }
    }
  }

  console.log(count);
};
