import { readFileSync } from "fs";

const measurementSums = (): number[] => {
  const data: number[] = readFileSync("./src/day-1/p2/input.txt", "utf8")
    .split("\n")
    .map((item: string) => parseInt(item));

  const sums: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i === data.length - 2) break;
    let sum = data[i] + data[i + 1] + data[i + 2];
    sums.push(sum);
  }
  return sums;
};

const countIncreased = (data: number[]) => {
  let increased = 0;
  for (let i = 0; i < data.length; i++) {
    if (i === 0) continue;
    const previous = data[i - 1];
    const current = data[i];
    if (previous < current) increased++;
  }
  return increased;
};

export const p2 = () => {
  const sums = measurementSums();
  const increased = countIncreased(sums);
  console.log(increased);
};
