import {readFileSync} from 'fs';

const map = new Map();

const getVal = (key: string): number|null => {
  if (/^\d+$/.test(key)) {
    return parseInt(key);
  }
  if (map.has(key)) {
    return map.get(key);
  }
  return null;
};

const d = (...args) => {
  console.log(...args);
};

const dd = (...args) => {
  console.log(...args);
  process.exit();
};

const getAnswer = (overrideB: number|null = null) => {
  let data = readFileSync('./inputs/07.txt', 'utf8').split("\n");
  let res = 0;
  while (data.length) {
    data.forEach((line, i) => {
      let opsAndDest = line.split(' -> ');
      let ops = opsAndDest[0].split(' ');
      let opResult;
      if (ops.length == 1) {
        let num = getVal(ops[0]);
        if (num === null) {
          return;
        }
        opResult = num;
      } else if (ops.length == 2) {
        // not operator
        let num = getVal(ops[1]);
        if (num === null) {
          return;
        }
        opResult = 65535 - num;
      } else if (ops.length == 3) {
        let num1 = getVal(ops[0]),
            num2 = getVal(ops[2]),
            operator = ops[1];
        if (num1 === null || num2 === null) {
          return;
        }
        if (['RSHIFT', 'LSHIFT'].includes(operator)) {
          opResult = operator == 'LSHIFT' ? num1<<num2 : num1>>num2;
        } else if (operator == 'AND') {
          opResult = num1 & num2;
        } else if (operator == 'OR') {
          opResult = num1 | num2;
        }
      }
      if (opsAndDest[1] == 'b' && typeof overrideB == 'number') opResult = overrideB;
      map.set(opsAndDest[1], opResult);
      data.splice(i, 1);
    });
  }
  return map.get('a');
};

let answer1 = getAnswer();
map.clear();
let answer2 = getAnswer(answer1);
console.log(answer1, answer2);