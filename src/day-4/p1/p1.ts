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
  const data = readFileSync("./src/day-4/p1/input.txt", "utf8")
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
      if (number.mkd === 0) {
        console.log(number.num);
        sum += number.num;
      }
    })
  );
  return sum;
};

export const p1 = () => {
  const [input, boards] = parse(readInput());

  let winningBoard;
  let winningNumber;
  for (let i = 0; i < input.length; i++) {
    const currentNum = input[i];
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

  if (winningBoard && winningNumber) {
    const sum = sumUnmarked(winningBoard);
    console.log(sum * winningNumber);
  }
};
