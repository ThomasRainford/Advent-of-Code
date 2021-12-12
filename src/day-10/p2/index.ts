import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-10/p1/input.txt", "utf8")
    .split("\n")
    .map((row) => row.split(""));

  return data;
};

export const p2 = () => {
  const input = readInput();

  let score = 0;
  let autoScores: number[] = [];
  loop: for (let li = 0; li < input.length; li++) {
    const line = input[li];
    let stack = [];
    for (let ci = 0; ci < line.length; ci++) {
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
            continue loop;
          }
          stack.pop();
          break;
        case "]":
          if (stack[stack.length - 1] !== "[") {
            score += 57;
            continue loop;
          }
          stack.pop();
          break;
        case "}":
          if (stack[stack.length - 1] !== "{") {
            score += 1197;
            continue loop;
          }
          stack.pop();
          break;
        case ">":
          if (stack[stack.length - 1] !== "<") {
            score += 25137;
            continue loop;
          }
          stack.pop();
          break;
      }
    }

    stack = stack.reverse();
    let autoScore = 0;
    for (let s = 0; s < stack.length; s++) {
      const char = stack[s];
      autoScore *= 5;
      switch (char) {
        case "(":
          autoScore += 1;
          break;
        case "[":
          autoScore += 2;
          break;
        case "{":
          autoScore += 3;
          break;
        case "<":
          autoScore += 4;
          break;
      }
    }
    autoScores.push(autoScore);
  }

  autoScores = autoScores.sort((a, b) => a - b);
  const middle = autoScores[Math.floor(autoScores.length / 2)];
  console.log(middle);
};
