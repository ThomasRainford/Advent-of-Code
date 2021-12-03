import { readFileSync } from "fs";

type Movement = {
  direction: string;
  amount: number;
};

const readInput = (): Movement[] => {
  const data: Movement[] = readFileSync("./src/day-2/p1/input.txt", "utf8")
    .split("\n")
    .map((item: string) => {
      const mv = item.split(" ");
      const direction = mv[0];
      const amount = parseInt(mv[1]);
      return { direction, amount };
    });
  return data;
};

export const p1 = () => {
  const movements = readInput();
  let horizontal = 0;
  let depth = 0;

  for (let i = 0; i < movements.length; i++) {
    const mvmt = movements[i];
    switch (mvmt.direction) {
      case "forward":
        horizontal += mvmt.amount;
        break;
      case "up":
        depth -= mvmt.amount;
        break;
      case "down":
        depth += mvmt.amount;
        break;
      default:
        console.log("Problem with input file.");
    }
  }
  const result = horizontal * depth;
  console.log(result);
};
