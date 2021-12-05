import { readFileSync } from "fs";

type Input = number[];

type Number = {
  num: number;
  mkd: 0 | 1;
};

type Board = {
  numbers: Number[][];
};

const readInput = () => {
  const data = readFileSync("./src/day-4/p2/input.txt", "utf8")
    .split("\n")
    .filter((item) => item !== "");

  return data;
};

const parse = (data: string[]): [Input, Board[]] => {
  const numbers: Input = data[0].split(",").map((item) => parseInt(item));
  data.splice(0, 1);
  let boards: string[][] = [];
  const len = data.length;
  for (let i = 0; i < len / 5; i++) {
    boards.push(data.splice(0, 5));
  }
  const bs = boards.map((row) =>
    row.map((num) =>
      num
        .trim()
        .replaceAll("  ", " ")
        .split(" ")
        .map((item) => parseInt(item))
    )
  );
  const bds: Board[] = [];
  bs.forEach((bd) => {
    const numbers: Number[][] = bd.map((row) =>
      row.map((item) => {
        return { num: item, mkd: 0 };
      })
    );
    bds.push({ numbers });
  });

  return [numbers, bds];
};

const print = (boards: Board[]) => {
  boards.forEach((board) => {
    console.log("Board === ");
    console.log(board.numbers);
  });
};

const checkBoard = (board: Board) => {
  const columns = (m: Number[][]) => m[0].map((_, i) => m.map((x) => x[i]));
  const boardColumn = columns(board.numbers);

  let won = false;
  board.numbers.forEach((row) => {
    let marked = row.map((number) => number.mkd);
    if (!marked.includes(0)) {
      won = true;
    }
  });

  boardColumn.forEach((row) => {
    let marked = row.map((number) => number.mkd);
    if (!marked.includes(0)) won = true;
  });

  return won;
};

const sumUnmarked = (board: Board): number => {
  let sum = 0;
  board.numbers.forEach((row) =>
    row.forEach((number) => {
      if (number.mkd === 0) sum += number.num;
    })
  );
  return sum;
};

const winner = (
  boards: Board[],
  input: Input
): [Board | undefined, number | undefined, number] => {
  let winningBoard;
  let winningNumber;
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const currentNum = input[i];
    count++;
    for (let bi = 0; bi < boards.length; bi++) {
      const board: Board = boards[bi];
      for (let rowi = 0; rowi < board.numbers.length; rowi++) {
        const numbers = board.numbers[rowi];
        for (let numi = 0; numi < numbers.length; numi++) {
          const number = numbers[numi];
          if (number.num === currentNum) number.mkd = 1;
          const won = checkBoard(board);
          if (won) {
            winningBoard = board;
            winningNumber = currentNum;
            break;
          }
        }
        if (winningBoard) break;
      }
      if (winningBoard) break;
    }
    if (winningBoard) break;
  }
  return [winningBoard, winningNumber, count];
};

export const p2 = () => {
  const [input, boards] = parse(readInput());

  let max = 0;
  let b;
  let num;
  boards.forEach((board) => {
    const won = winner([board], input);
    const count = won[2];
    if (count > max) {
      max = count;
      b = won[0];
      num = won[1];
    }
  });

  if (num && b) console.log(sumUnmarked(b) * num);
};
