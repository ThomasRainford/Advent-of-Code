import { readFileSync } from "fs";

type Entry = {
  pattern: string[];
  digits: string[]; // should have four elements.
};

const readInput = () => {
  let data = readFileSync("./src/day-8/p1/input.txt", "utf8")
    .split("\n")
    .map((row) => row.split(" | "));

  const entrys: Entry[] = [];
  data.forEach((row) =>
    entrys.push({ pattern: row[0].split(" "), digits: row[1].split(" ") })
  );

  return entrys;
};

export const p1 = () => {
  const input = readInput();

  let count = 0;
  input.forEach((entry) => {
    const digits = entry.digits;

    digits.forEach((digit) => {
      switch (digit.split("").length) {
        case 2:
        case 3:
        case 4:
        case 7:
          count++;
          break;
      }
    });
  });

  console.log(count);
};
