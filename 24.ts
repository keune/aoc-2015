import {readFileSync} from 'fs';

const isObj = (o: any) => (typeof o === 'object' && !(o instanceof Array));
const isObjOrArray = (o: any) => typeof o === 'object';

const getAnswer = () => {
  let data = readFileSync('./inputs/12.txt', 'utf8');
  let wholeJson = JSON.parse(data);
  let res = 0;

  let run = (jsonObj: any) => {
    if (typeof jsonObj === 'number') {
      res += jsonObj;
    } else if (isObj(jsonObj)) {
      let vals = [...Object.values(jsonObj)];
      if (!vals.includes('red')) vals.forEach(val => run(val));
    } else if (isObjOrArray(jsonObj)) {
      [...Object.values(jsonObj)].forEach(val => run(val));
    }
  };
  run(wholeJson);
  return res;
};

let answer = getAnswer();
console.log(answer);