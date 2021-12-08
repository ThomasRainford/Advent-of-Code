import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-6/p1/input.txt", "utf8")
    .split(",")
    .map(Number);

  return data;
};
export const p1 = () => {
  const input = readInput();

  const DAYS = 80;

  for (let d = 0; d < DAYS; d++) {
    const eights: number[] = [];
    for (let i = 0; i < input.length; i++) {
      const count = input[i];
      if (count === 0) {
        input[i] = 6;
        eights.push(8);
      } else {
        input[i]--;
      }
    }
    for (let a = 0; a < eights.length; a++) {
      input.push(eights[a]);
    }
  }

  //console.log(input);
  console.log(input.length);
};
