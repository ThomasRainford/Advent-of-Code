import { readFileSync } from "fs";

const data: number[] = readFileSync("./src/day-1/p1/input.txt", "utf8")
  .split("\n")
  .map((item: string) => parseInt(item));

let increased = 0;
for (let i = 0; i < data.length; i++) {
  if (i === 0) continue;

  const previous = data[i - 1];
  const current = data[i];

  if (previous < current) increased++;
}

console.log(increased);
