import {readFileSync} from 'fs';

const getAnswer = () => {
  let data = readFileSync('./inputs/08.txt', 'utf8').split("\n");
  let codeLen = 0, memLen = 0;
  data.forEach(line => {
    codeLen += line.length;
    let s = line.slice(1, -1).replace(/\\x[0-9a-f]{2}/g, 'q');
    s = s.replace(/\\"/g, 'q');
    s = s.replace(/\\\\/g, 'q');
    memLen += s.length;
  });
  return codeLen - memLen;
};

let answer = getAnswer();
console.log(answer);