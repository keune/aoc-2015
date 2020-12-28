const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/01.txt', 'utf8');
  return data.match(/\(/g).length - data.match(/\)/g).length;
};

let answer = getAnswer();
console.log(answer);