import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-10/p2/sample.txt", "utf8")
    .split("\n")
    .map((row) => row.split(""));

  return data;
};

export const p1 = () => {
  const input = readInput();

  let score = 0;
  const stack = [];
  for (let li = 0; li < input.length; li++) {
    const line = input[li];
    loop: for (let ci = 0; ci < line.length; ci++) {
      const char = line[ci];
      switch (char) {
        case "(":
          stack.push(char);
          break;
        case "[":
          stack.push(char);
          break;
        case "{":
          stack.push(char);
          break;
        case "<":
          stack.push(char);
          break;
        case ")":
          if (stack[stack.length - 1] !== "(") {
            score += 3;
            break loop;
          }
          stack.pop();
          break;
        case "]":
          if (stack[stack.length - 1] !== "[") {
            score += 57;
            break loop;
          }
          stack.pop();
          break;
        case "}":
          if (stack[stack.length - 1] !== "{") {
            score += 1197;
            break loop;
          }
          stack.pop();
          break;
        case ">":
          if (stack[stack.length - 1] !== "<") {
            score += 25137;
            break loop;
          }
          stack.pop();
          break;
      }
    }
  }

  console.log(score);
};
