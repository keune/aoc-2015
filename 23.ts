import {readFileSync} from 'fs';

const getAnswer = () => {
  let data = readFileSync('./inputs/12.txt', 'utf8');
  let nums = data.match(/-?\d+/g);
  let res = 0;
  if (nums) {
    res = nums.reduce((a, b) => a + +b, 0);
  }
  return res;
};

let answer = getAnswer();
console.log(answer);