import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-11/p1/input.txt", "utf8")
    .split("\n")
    .map((row) => row.split("").map(Number));

  return data;
};

type Octopus = {
  x: number;
  y: number;
  level: number;
  flashed: boolean;
};

const parse = (input: number[][]) => {
  const octopi: Octopus[][] = [];
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    const o: Octopus[] = [];
    for (let j = 0; j < row.length; j++) {
      const value = row[j];
      o.push({ x: j, y: i, level: value, flashed: false });
    }
    octopi.push(o);
  }
  return octopi;
};

const getCell = (matrix: Octopus[][], y: number, x: number) => {
  let value, hasValue;

  try {
    hasValue = matrix[y][x] !== undefined;
    value = hasValue ? matrix[y][x] : null;
  } catch (e) {
    value = null;
  }

  return value;
};

const surroundings = (matrix: Octopus[][], y: number, x: number) => {
  // Directions are clockwise
  return [
    getCell(matrix, y - 1, x),
    getCell(matrix, y - 1, x + 1),
    getCell(matrix, y, x + 1),
    getCell(matrix, y + 1, x + 1),
    getCell(matrix, y + 1, x),
    getCell(matrix, y + 1, x - 1),
    getCell(matrix, y, x - 1),
    getCell(matrix, y - 1, x - 1),
  ];
};

const step = (octopi: Octopus[][]): number => {
  // Add one
  for (let i = 0; i < octopi.length; i++) {
    const row = octopi[i];
    for (let j = 0; j < row.length; j++) {
      row[j].level++;
    }
  }
  //Flashes
  let flashes = 0;
  while (true) {
    for (let i = 0; i < octopi.length; i++) {
      const row = octopi[i];
      for (let j = 0; j < row.length; j++) {
        const octopus = row[j];
        if (octopus.level > 9 && !octopus.flashed) {
          octopus.flashed = true;
          flashes++;
          const nbrs = surroundings(octopi, i, j);
          for (let n = 0; n < nbrs.length; n++) {
            const nbr = nbrs[n];
            if (nbr !== null) {
              nbr.level++;
            }
          }
        }
      }
    }
    let cont = false;
    for (let i = 0; i < octopi.length; i++) {
      const row = octopi[i];
      for (let j = 0; j < row.length; j++) {
        const octopus = row[j];
        if (octopus.level > 9) {
          cont = true;
        }
        if (octopus.flashed) octopus.level = 0;
      }
    }
    if (!cont) break;
  }
  // Reset flashes
  for (let i = 0; i < octopi.length; i++) {
    const row = octopi[i];
    for (let j = 0; j < row.length; j++) {
      row[j].flashed = false;
    }
  }

  return flashes;
};

export const p1 = () => {
  const input: number[][] = readInput();
  const octopi = parse(input);

  let flashes = 0;
  for (let i = 0; i < 100; i++) {
    flashes += step(octopi);
  }

  for (let i = 0; i < octopi.length; i++) {
    console.log(octopi[i].map((o) => o.level));
  }
  console.log(flashes);
};
