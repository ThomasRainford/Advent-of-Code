import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-6/p1/input.txt", "utf8")
    .split(",")
    .map(Number);

  return data;
};
export const p2 = () => {
  const input = readInput();

  let counts = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  for (let state of input) {
    ++counts[state];
  }

  function step() {
    let newcounts = [];
    for (let i = 1; i < counts.length; ++i) {
      newcounts.push(counts[i]);
    }
    newcounts.push(0);
    newcounts[6] += counts[0];
    newcounts[8] += counts[0];
    counts = newcounts;
  }

  for (let r = 0; r < 256; ++r) {
    step();
  }

  let res = 0;
  for (let c of counts) {
    res += c;
  }

  console.log(res);
};
