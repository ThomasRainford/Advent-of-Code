import { readFileSync } from "fs";

const readInput = (): number[][] => {
  const data = readFileSync("./src/day-3/p1/input.txt", "utf8")
    .split("\n")
    .map((item: string) => item.split("").map((item) => parseInt(item)));
  return data;
};

const mostCommon = (value: number, list: number[]) => {
  let zeros = 0;
  let ones = 0;
  list.forEach((num) => (num === 0 ? zeros++ : ones++));
  return value === 0 ? zeros > ones : ones > zeros;
};

const gamma = (list: number[][]) => {
  let result: number[] = [];
  list.forEach((i) => {
    let r = mostCommon(1, i);
    r ? result.push(1) : result.push(0);
  });
  return result;
};

const epsilon = (list: number[][]) => {
  let result: number[] = [];
  list.forEach((i) => {
    let r = mostCommon(0, i);
    r ? result.push(1) : result.push(0);
  });
  return result;
};

export const p1 = () => {
  const data = readInput();

  const columns = (m: number[][]) => m[0].map((_, i) => m.map((x) => x[i]));

  const list = columns(data);
  const gammaResult = parseInt(gamma(list).join(""), 2);
  const epsilonResult = parseInt(epsilon(list).join(""), 2);

  console.log(gammaResult * epsilonResult);
};
