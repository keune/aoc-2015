const fs = require('fs');

const getKey = (x, y) => `${x}_${y}`;

const getPos = (x, y, dir) => {
  switch (dir) {
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
  return [x, y];
};

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/03.txt', 'utf8');
  let map = new Map()
    x = 0,
    y = 0,
    rx = 0,
    ry = 0;
  map.set(getKey(0, 0), 2);
  for (let i = 0; i < data.length; i += 2) {
    let santa = data[i],
      robo = data[i + 1];

    [x, y] = getPos(x, y, santa);
    [rx, ry] = getPos(rx, ry, robo);

    [
      [x, y],
      [rx, ry]
    ].forEach(xAndY => {
      let key = getKey(xAndY[0], xAndY[1]);
      let count = map.get(key) || 0;
      count++;
      map.set(key, count);
    });
  }
  return map.size;
};

let answer = getAnswer();
console.log(answer);