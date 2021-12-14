import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-12/p1/sample.txt", "utf8")
    .split("\n")
    .map((row) => row.split("-"));

  return data;
};

const isSmall = (letter: string): boolean => {
  return letter.toLowerCase() === letter;
};

const parse = (input: string[][], cave: string) => {
  const nodes: string[] = [];
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    if (row[0] === cave) nodes.push(row[1]);
    if (row[1] === cave) nodes.push(row[0]);
  }
  return nodes;
};

const visited: string[] = [];
let count = 0;
const step = (input: string[][], cave: string) => {
  if (isSmall(cave) && visited.includes(cave)) return;

  if (isSmall(cave) && !visited.includes(cave)) visited.push(cave);

  if (cave === "end") count++;

  const nbrs = parse(input, cave);
  for (let i = 0; i < nbrs.length; i++) {
    if (nbrs[i] === "start") continue;
    step(input, nbrs[i]);
  }

  if (isSmall(cave)) {
    visited.pop();
  }
};

export const p1 = () => {
  const input = readInput();

  step(input, "start");

  console.log(input);
  console.log(count);
};
