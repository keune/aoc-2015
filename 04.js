const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/02.txt', 'utf8');
  let total = 0;
  data.split("\n").forEach(size => {
    let sizes = size.split('x').map(n => +n);
    sizes.sort((a, b) => a - b);
    let smallFacePerimeter = 2 * (sizes[0] + sizes[1]);
    let vol = sizes[0] * sizes[1] * sizes[2];
    total += vol + smallFacePerimeter;
  });
  return total;
};

let answer = getAnswer();
console.log(answer);