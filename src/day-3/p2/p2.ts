import { readFileSync } from "fs";

const readInput = (): number[][] => {
  const data = readFileSync("./src/day-3/p2/input.txt", "utf8")
    .split("\n")
    .map((item: string) => item.split("").map((item) => parseInt(item)));
  return data;
};

const mostCommonOx = (list: number[]) => {
  let zeros = 0;
  let ones = 0;
  list.forEach((num) => (num === 0 ? zeros++ : ones++));
  if (zeros === ones) return 1;
  return zeros > ones ? 0 : 1;
};

const leastCommonCO2 = (list: number[]) => {
  let zeros = 0;
  let ones = 0;
  list.forEach((num) => (num === 0 ? zeros++ : ones++));
  if (zeros === ones) return 0;
  return zeros < ones ? 0 : 1;
};

export const p2 = () => {
  const data = readInput();
  const columns = (m: number[][]) => m[0].map((_, i) => m.map((x) => x[i]));
  const list = columns(data);

  let oxData = data;
  let oxList = list;
  for (let i = 0; i < oxList.length; i++) {
    const mc = mostCommonOx(oxList[i]);
    oxData = oxData.filter((col) => col[i] === mc);
    oxList = columns(oxData);
    if (oxData.length === 1) break;
  }

  let co2Data = data;
  let co2List = list;
  for (let i = 0; i < co2List.length; i++) {
    const mc = leastCommonCO2(co2List[i]);
    co2Data = co2Data.filter((col) => col[i] === mc);
    co2List = columns(co2Data);
    if (co2Data.length === 1) break;
  }

  const result =
    parseInt(oxData[0].join(""), 2) * parseInt(co2Data[0].join(""), 2);

  console.log(result);
};
