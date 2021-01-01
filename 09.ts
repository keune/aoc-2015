import {readFileSync} from 'fs';

const getAnswer = () => {
  let data = readFileSync('./inputs/05.txt', 'utf8').split("\n");
  let res = 0;
  data.forEach(line => {
    if (line.split(/[aeiou]/).length >= 4 &&
      /([a-z])(?=\1)/.test(line) &&
      !/(ab)|(cd)|(pq)|(xy)/.test(line)) {
      res++;
    }
  });
  return res;
};

let answer = getAnswer();
console.log(answer);