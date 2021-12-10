import { readFileSync } from "fs";

const readInput = () => {
  let data = readFileSync("./src/day-9/p1/input.txt", "utf8")
    .split("\n")
    .map((entry) => entry.split("").map(Number));

  return data;
};

const check = (
  input: number[][],
  current: number,
  x: number,
  y: number
): number => {
  if (y === 0 && x === 0) {
    const right = input[y][x + 1];
    const bottom = input[y + 1][x];
    if (current < right && current < bottom) {
      return current;
    } else {
      return -1;
    }
  } else if (y === 0 && x === input[0].length - 1) {
    const left = input[y][x - 1];
    const bottom = input[y + 1][x];
    if (current < left && current < bottom) {
      return current;
    } else {
      return -1;
    }
  } else if (y === input.length - 1 && x === 0) {
    const right = input[y][x + 1];
    const top = input[y - 1][x];
    if (current < right && current < top) {
      return current;
    } else {
      return -1;
    }
  } else if (y === input.length - 1 && x === input[0].length - 1) {
    const left = input[y][x - 1];
    const top = input[y - 1][x];
    if (current < left && current < top) {
      return current;
    } else {
      return -1;
    }
  } else if (x === 0 && y > 0 && y < input.length - 1) {
    const right = input[y][x + 1];
    const top = input[y - 1][x];
    const bottom = input[y + 1][x];
    if (current < right && current < top && current < bottom) {
      return current;
    } else {
      return -1;
    }
  } else if (y === 0 && x > 0 && x < input[0].length - 1) {
    const right = input[y][x + 1];
    const left = input[y][x - 1];
    const bottom = input[y + 1][x];
    if (current < left && current < right && current < bottom) {
      return current;
    } else {
      return -1;
    }
  } else if (x === input[0].length - 1 && y > 0 && y < input.length - 1) {
    const left = input[y][x - 1];
    const top = input[y - 1][x];
    const bottom = input[y + 1][x];
    if (current < left && current < top && current < bottom) {
      return current;
    } else {
      return -1;
    }
  } else if (y === input.length - 1 && x > 0 && x < input[0].length - 1) {
    const right = input[y][x + 1];
    const top = input[y - 1][x];
    const left = input[y][x - 1];
    if (current < right && current < top && current < left) {
      return current;
    } else {
      return -1;
    }
  } else {
    // ok
    // middle
    const right = input[y][x + 1];
    const left = input[y][x - 1];
    const top = input[y - 1][x];
    const bottom = input[y + 1][x];
    if (
      current < left &&
      current < right &&
      current < top &&
      current < bottom
    ) {
      return current;
    } else {
      return -1;
    }
  }

  // if (y === 0) {
  //   // top
  //   if (x === 0) {
  //     const right = input[y][x + 1];
  //     const bottom = input[y + 1][x];
  //     if (current < right && current < bottom) {
  //       return current;
  //     } else {
  //       return -1;
  //     }
  //   } else if (x === input[0].length - 1) {
  //     // ok
  //     const left = input[y][x - 1];
  //     const bottom = input[y + 1][x];
  //     if (current < left && current < bottom) {
  //       return current;
  //     } else {
  //       return -1;
  //     }
  //   } else {
  //     // ok
  //     const right = input[y][x + 1];
  //     const left = input[y][x - 1];
  //     const bottom = input[y + 1][x];
  //     if (current < left && current < right && current < bottom) {
  //       return current;
  //     } else {
  //       return -1;
  //     }
  //   }
  // } else if (y === input.length - 1) {
  //   // bottom
  //   if (x === 0) {
  //     const right = input[y][x + 1];
  //     const top = input[y - 1][x];
  //     if (current < right && current < top) {
  //       return current;
  //     } else {
  //       return -1;
  //     }
  //   } else if (x === input[0].length - 1) {
  //     const left = input[y][x - 1];
  //     const top = input[y - 1][x];
  //     if (current < left && current < top) {
  //       return current;
  //     } else {
  //       return -1;
  //     }
  //   } else {
  //     // ok
  //     const right = input[y][x + 1];
  //     const top = input[y - 1][x];
  //     const left = input[y][x - 1];
  //     if (current < right && current < top && current < left) {
  //       return current;
  //     } else {
  //       return -1;
  //     }
  //   }
  // } else {
  //   // ok
  //   // middle
  //   const right = input[y][x + 1];
  //   const left = input[y][x - 1];
  //   const top = input[y - 1][x];
  //   const bottom = input[y + 1][x];
  //   if (
  //     current < left &&
  //     current < right &&
  //     current < top &&
  //     current < bottom
  //   ) {
  //     return current;
  //   } else {
  //     return -1;
  //   }
  // }
};

export const p1 = () => {
  const input = readInput();

  const lows: number[] = [];
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const current = row[x];
      const low = check(input, current, x, y);
      if (low > -1) {
        lows.push(low);
      }
    }
  }

  let sum = 0;
  lows.forEach((low) => (sum += low + 1));

  console.log(lows);
  console.log(sum);
};
