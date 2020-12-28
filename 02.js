const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/01.txt', 'utf8');
  let cf = 0;
  for (let i = 0; i < data.length; i++) {
    cf += (data[i] == '(' ? 1 : -1);
    if (cf === -1) return i + 1;
  }
  return false;
};

let answer = getAnswer();
console.log(answer);