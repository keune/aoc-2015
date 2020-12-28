const fs = require('fs');

const getKey = (x, y) => `${x}_${y}`;

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/03.txt', 'utf8');
  let map = new Map()
    x = 0,
    y = 0;
  map.set(getKey(0, 0), 1);
  for (let i = 0; i < data.length; i++) {
    switch (data[i]) {
      case '^':
        y--;
      break;
     case 'v':
        y++;
      break;
      case '<':
        x--;
      break;
      case '>':
        x++;
      break;
    }
    let key = getKey(x, y);
    let count = map.get(key) || 0;
    count++;
    map.set(key, count);
  }
  return map.size;
};

let answer = getAnswer();
console.log(answer);