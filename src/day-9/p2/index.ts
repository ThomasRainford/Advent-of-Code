import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-9/p2/input.txt", "utf8")
    .split("\n")
    .map((entry) => entry.split("").map(Number));

  return data;
};

const check = (
  input: number[][],
  current: number,
  x: number,
  y: number
): number => {
  // top - left
  if (y === 0 && x === 0) {
    const right = input[y][x + 1];
    const bottom = input[y + 1][x];
    if (current < right && current < bottom) {
      return current;
    } else {
      return -1;
    }
    // top - right
  } else if (y === 0 && x === input[0].length - 1) {
    const left = input[y][x - 1];
    const bottom = input[y + 1][x];
    if (current < left && current < bottom) {
      return current;
    } else {
      return -1;
    }
    // bottom - left
  } else if (y === input.length - 1 && x === 0) {
    const right = input[y][x + 1];
    const top = input[y - 1][x];
    if (current < right && current < top) {
      return current;
    } else {
      return -1;
    }
    // bottom - right
  } else if (y === input.length - 1 && x === input[0].length - 1) {
    const left = input[y][x - 1];
    const top = input[y - 1][x];
    if (current < left && current < top) {
      return current;
    } else {
      return -1;
    }
    // left - middle
  } else if (x === 0 && y > 0 && y < input.length - 1) {
    const right = input[y][x + 1];
    const top = input[y - 1][x];
    const bottom = input[y + 1][x];
    if (current < right && current < top && current < bottom) {
      return current;
    } else {
      return -1;
    }
    // top - middle
  } else if (y === 0 && x > 0 && x < input[0].length - 1) {
    const right = input[y][x + 1];
    const left = input[y][x - 1];
    const bottom = input[y + 1][x];
    if (current < left && current < right && current < bottom) {
      return current;
    } else {
      return -1;
    }
    // right - middle
  } else if (x === input[0].length - 1 && y > 0 && y < input.length - 1) {
    const left = input[y][x - 1];
    const top = input[y - 1][x];
    const bottom = input[y + 1][x];
    if (current < left && current < top && current < bottom) {
      return current;
    } else {
      return -1;
    }
    // bottom - middle
  } else if (y === input.length - 1 && x > 0 && x < input[0].length - 1) {
    const right = input[y][x + 1];
    const top = input[y - 1][x];
    const left = input[y][x - 1];
    if (current < right && current < top && current < left) {
      return current;
    } else {
      return -1;
    }
    // middle
  } else {
    const right = input[y][x + 1];
    const left = input[y][x - 1];
    const top = input[y - 1][x];
    const bottom = input[y + 1][x];
    if (
      current < left &&
      current < right &&
      current < top &&
      current < bottom
    ) {
      return current;
    } else {
      return -1;
    }
  }
};

const checkBasin = (
  input: number[][],
  current: number,
  x: number,
  y: number
): LowPoint[] => {
  if (x < 0 || y < 0 || x > input[0].length - 1 || y > input.length - 1) {
    return [];
  }

  const lowPs: LowPoint[] = [];

  // top - left
  if (y === 0 && x === 0) {
    const right = input[y][x + 1];
    const bottom = input[y + 1][x];
    if (right === current + 1) lowPs.push({ x: x + 1, y, value: current + 1 });
    if (bottom === current + 1) lowPs.push({ x, y: y + 1, value: current + 1 });
    // top - right
  } else if (y === 0 && x === input[0].length - 1) {
    const left = input[y][x - 1];
    const bottom = input[y + 1][x];
    if (left === current + 1) lowPs.push({ x: x - 1, y, value: current + 1 });
    if (bottom === current + 1) lowPs.push({ x, y: y + 1, value: current + 1 });
    // bottom - left
  } else if (y === input.length - 1 && x === 0) {
    const right = input[y][x + 1];
    const top = input[y - 1][x];
    if (right === current + 1) lowPs.push({ x: x + 1, y, value: current + 1 });
    if (top === current + 1) lowPs.push({ x, y: y - 1, value: current + 1 });
    // bottom - right
  } else if (y === input.length - 1 && x === input[0].length - 1) {
    const left = input[y][x - 1];
    const top = input[y - 1][x];
    if (left === current + 1) lowPs.push({ x: x - 1, y, value: current + 1 });
    if (top === current + 1) lowPs.push({ x, y: y - 1, value: current + 1 });
    // left - middle
  } else if (x === 0 && y > 0 && y < input.length - 1) {
    const right = input[y][x + 1];
    const top = input[y - 1][x];
    const bottom = input[y + 1][x];
    if (right === current + 1) lowPs.push({ x: x + 1, y, value: current + 1 });
    if (top === current + 1) lowPs.push({ x, y: y - 1, value: current + 1 });
    if (bottom === current + 1) lowPs.push({ x, y: y + 1, value: current + 1 });
    // top - middle
  } else if (y === 0 && x > 0 && x < input[0].length - 1) {
    const right = input[y][x + 1];
    const left = input[y][x - 1];
    const bottom = input[y + 1][x];
    if (left === current + 1) lowPs.push({ x: x - 1, y, value: current + 1 });
    if (right === current + 1) lowPs.push({ x: x + 1, y, value: current + 1 });
    if (bottom === current + 1) lowPs.push({ x, y: y + 1, value: current + 1 });
    // right - middle
  } else if (x === input[0].length - 1 && y > 0 && y < input.length - 1) {
    const left = input[y][x - 1];
    const top = input[y - 1][x];
    const bottom = input[y + 1][x];
    if (left === current + 1) lowPs.push({ x: x - 1, y, value: current + 1 });
    if (top === current + 1) lowPs.push({ x, y: y - 1, value: current + 1 });
    if (bottom === current + 1) lowPs.push({ x, y: y + 1, value: current + 1 });
    // bottom - middle
  } else if (y === input.length - 1 && x > 0 && x < input[0].length - 1) {
    const right = input[y][x + 1];
    const top = input[y - 1][x];
    const left = input[y][x - 1];
    if (right === current + 1) lowPs.push({ x: x + 1, y, value: current + 1 });
    if (top === current + 1) lowPs.push({ x, y: y - 1, value: current + 1 });
    if (left === current + 1) lowPs.push({ x: x - 1, y, value: current + 1 });
    // middle
  } else {
    const right = input[y][x + 1];
    const left = input[y][x - 1];
    const top = input[y - 1][x];
    const bottom = input[y + 1][x];
    if (left === current + 1) lowPs.push({ x: x - 1, y, value: current + 1 });
    if (right === current + 1) lowPs.push({ x: x + 1, y, value: current + 1 });
    if (top === current + 1) lowPs.push({ x, y: y - 1, value: current + 1 });
    if (bottom === current + 1) lowPs.push({ x, y: y + 1, value: current + 1 });
  }
  return lowPs;
};

type LowPoint = {
  x: number;
  y: number;
  value: number;
};

let count = 1;
let seen: LowPoint[] = [];
const basin = (input: number[][], lowPoint: LowPoint): number => {
  //
  const points = checkBasin(
    input,
    lowPoint.value,
    lowPoint.x,
    lowPoint.y
  ).filter((point) => point.value !== 9);
  //
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (!seen.some((p) => p.x === point.x && p.y === point.y)) {
      basin(input, point);
      seen.push(point);
      count++;
    }
  }

  return count;
};

export const p2 = () => {
  const input = readInput();

  const lowPoints: LowPoint[] = [];
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const current = row[x];
      const low = check(input, current, x, y);
      if (low > -1) {
        lowPoints.push({ x, y, value: low });
      }
    }
  }

  const basinSizes: number[] = [];
  for (let i = 0; i < lowPoints.length; i++) {
    const size = basin(input, lowPoints[i]);
    seen = [];
    count = 1;
    basinSizes.push(size);
  }

  //console.log(basinSizes);

  const maxs: number[] = [];
  const one = Math.max(...basinSizes);
  basinSizes.splice(basinSizes.indexOf(one), 1);
  maxs.push(one);
  const two = Math.max(...basinSizes);
  basinSizes.splice(basinSizes.indexOf(two), 1);
  maxs.push(two);
  const three = Math.max(...basinSizes);
  basinSizes.splice(basinSizes.indexOf(three), 1);
  maxs.push(three);

  console.log(maxs.reduce((prev, cur) => prev * cur));

  console.log(maxs);
};
