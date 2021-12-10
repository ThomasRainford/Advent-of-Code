import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-7/p1/input.txt", "utf8")
    .split(",")
    .map(Number);

  return data;
};

export const p2 = () => {
  const input = readInput();

  const max = Math.max(...input);
  const size = input.length;

  const totals = [];
  for (let i = 0; i < max; i++) {
    const currentDeltas: number[] = [];
    for (let c = 0; c < size; c++) {
      let delta = Math.abs(input[c] - i);
      const add = (delta * (delta + 1)) / 2;
      currentDeltas.push(add);
    }
    totals.push(currentDeltas.reduce((a, b) => a + b, 0));
  }

  console.log(Math.min(...totals));
};
