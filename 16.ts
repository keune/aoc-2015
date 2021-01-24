import {readFileSync} from 'fs';

const getAnswer = () => {
  let data = readFileSync('./inputs/08.txt', 'utf8').split("\n");
  let codeLen = 0, escLen = 0;
  data.forEach(line => {
    codeLen += line.length;
    let escaped = JSON.stringify(String(line));
    escLen += escaped.length;
  });
  return escLen - codeLen;
};

let answer = getAnswer();
console.log(answer);