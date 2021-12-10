import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-7/p1/input.txt", "utf8")
    .split(",")
    .map(Number);

  return data;
};

export const p1 = () => {
  const input = readInput();

  const max = Math.max(...input);
  const size = input.length;

  const totals = [];
  for (let i = 0; i < max; i++) {
    const currentDeltas = [];
    for (let c = 0; c < size; c++) {
      const current = input[c];
      const delta = Math.abs(current - i);
      currentDeltas.push(delta);
    }
    totals.push(currentDeltas.reduce((a, b) => a + b, 0));
  }

  console.log(Math.min(...totals));
  console.log(input);
};
