// import { readFileSync } from "fs";

// const readInput = () => {
//   let data = readFileSync("./src/day-8/p2/input.txt", "utf8")
//     .split("\n")
//     .map((row) => row.split(" | "))
//     .map((entry) => entry.map((r) => r.split(" ")));

//   return data;
// };

// function permutator(inputArr: number[]) {
//   var results: any[] = [];

//   function permute(arr: any, memo: any) {
//     var cur,
//       memo = memo || [];

//     for (var i = 0; i < arr.length; i++) {
//       cur = arr.splice(i, 1);
//       if (arr.length === 0) {
//         results.push(memo.concat(cur));
//       }
//       permute(arr.slice(), memo.concat(cur));
//       arr.splice(i, 0, cur[0]);
//     }

//     return results;
//   }

//   return permute(inputArr, []);
// }

// Array.prototype.equals = function (array: any) {
//   // if the other array is a falsy value, return
//   if (!array) return false;

//   // compare lengths - can save a lot of time
//   if (this.length != array.length) return false;

//   for (var i = 0, l = this.length; i < l; i++) {
//     // Check if we have nested arrays
//     if (this[i] instanceof Array && array[i] instanceof Array) {
//       // recurse into the nested arrays
//       if (!this[i].equals(array[i])) return false;
//     } else if (this[i] != array[i]) {
//       // Warning - two different object instances will never be equal: {x:20} != {x:20}
//       return false;
//     }
//   }
//   return true;
// };

// export const p2 = () => {
//   const input = readInput();

//   function mapsignals(str: any, mapping: any) {
//     return str
//       .split("")
//       .map((c: any) => mapping[c.charCodeAt(0) - 97])
//       .sort();
//   }

//   let mappings = permutator([0, 1, 2, 3, 4, 5, 6]);

//   function solve(input: any, output: any) {
//     let valid = 0;
//     let realmapping = null;
//     outer: for (let mapping of mappings) {
//       let found: any = {};
//       for (let x of input) {
//         let signals = mapsignals(x, mapping);
//         if (signals.length == 2 && !signals.equals([2, 5])) continue outer;
//         if (signals.length == 3 && !signals.equals([0, 2, 5])) continue outer;
//         if (signals.length == 4 && !signals.equals([1, 2, 3, 5]))
//           continue outer;
//         if (signals.length == 7 && !signals.equals([0, 1, 2, 3, 4, 5, 6]))
//           continue outer;

//         if (signals.length == 5) {
//           // must be 2, 3 or 5
//           if (signals.equals([0, 2, 3, 4, 6])) {
//             if (found["two"]) continue outer;
//             found["two"] = true;
//           } else if (signals.equals([0, 2, 3, 5, 6])) {
//             if (found["three"]) continue outer;
//             found["three"] = true;
//           } else if (signals.equals([0, 1, 3, 5, 6])) {
//             if (found["five"]) continue outer;
//             found["five"] = true;
//           } else {
//             continue outer;
//           }
//         }

//         if (signals.length == 6) {
//           // must be 0, 6 or 9
//           if (signals.equals([0, 1, 2, 4, 5, 6])) {
//             if (found["zero"]) continue outer;
//             found["zero"] = true;
//           } else if (signals.equals([0, 1, 3, 4, 5, 6])) {
//             if (found["six"]) continue outer;
//             found["six"] = true;
//           } else if (signals.equals([0, 1, 2, 3, 5, 6])) {
//             if (found["nine"]) continue outer;
//             found["nine"] = true;
//           } else {
//             continue outer;
//           }
//         }
//       }
//       ++valid;
//       realmapping = mapping;
//     }
//     if (valid != 1) {
//       throw new Error("invalid");
//     }
//     let outputDigits = "";
//     for (let x of output) {
//       let ns = mapsignals(x, realmapping);
//       if (ns.equals([0, 1, 2, 4, 5, 6])) outputDigits += "0";
//       else if (ns.equals([2, 5])) outputDigits += "1";
//       else if (ns.equals([0, 2, 3, 4, 6])) outputDigits += "2";
//       else if (ns.equals([0, 2, 3, 5, 6])) outputDigits += "3";
//       else if (ns.equals([1, 2, 3, 5])) outputDigits += "4";
//       else if (ns.equals([0, 1, 3, 5, 6])) outputDigits += "5";
//       else if (ns.equals([0, 1, 3, 4, 5, 6])) outputDigits += "6";
//       else if (ns.equals([0, 2, 5])) outputDigits += "7";
//       else if (ns.equals([0, 1, 2, 3, 4, 5, 6])) outputDigits += "8";
//       else if (ns.equals([0, 1, 2, 3, 5, 6])) outputDigits += "9";
//       else throw new Error("invalid digit");
//     }
//     return parseInt(outputDigits);
//   }

//   let res = 0;
//   for (let i = 0; i < input.length; ++i) {
//     res += solve(input[i][0], input[i][1]);
//   }
//   console.log(res);

//   //console.log(input);
// };
