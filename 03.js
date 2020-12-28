const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/02.txt', 'utf8');
  let total = 0;
  data.split("\n").forEach(size => {
    let sizes = size.split('x').map(n => +n);
    sizes.sort((a, b) => a - b);
    let slack = sizes[0] * sizes[1];
    let sa = 2 * sizes[0] * sizes[1] + 2 * sizes[0] * sizes[2] + 2 * sizes[1] * sizes[2];
    total += sa + slack;
  });
  return total;
};

let answer = getAnswer();
console.log(answer);