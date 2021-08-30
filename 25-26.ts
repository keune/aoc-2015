import {readFileSync} from 'fs';

const permute = (arr: any[]) : any[] => {
  let copied = arr.slice();
  if (copied.length === 1) {
    return [copied];
  } else if (copied.length === 2) {
    return [copied, copied.slice().reverse()];
  } else {
    let res:any = [];
    copied.forEach((el, i) => {
      let rest = copied.slice();
      rest.splice(i, 1);
      let subPermutes = permute(rest);
      let permutes = subPermutes.map(subPermute => [el, ...subPermute]);
      res = [...res, ...permutes];
    });
    return res;
  }
};

interface Feeling {
  name: string;
  units: number;
}

const getAnswer = (myselfIncluded = false) => {
  let myself = 'Ahmet';
  let lines: string[] = readFileSync('./inputs/13.txt', 'utf8').split("\n");
  let map: Map<string, Feeling[]> = new Map<string, Feeling[]>();
  let people: string[] = [];
  let maxTotalChange = 0;
  lines.forEach(line => {
    let matches = line.match(/^([A-Za-z]+) would (gain|lose) (\d+) .+ ([A-Za-z]+)\.$/);
    if (matches !== null && matches.length == 5) {
      let person = matches[1];
      let isLoss = matches[2] === 'lose';
      let units = +(matches[3]);
      if (isLoss) units *= -1;
      let against = matches[4];
      
      if (!people.includes(person)) people.push(person);

      if (!map.has(person)) {
        let initialFeelings = myselfIncluded ? [{name: myself, units: 0}] : [];
        map.set(person, initialFeelings);
      }
      (map.get(person) as Feeling[]).push({name: against, units: units} as Feeling);
    } else {
      console.log('unexpected line format', line);
    }
  });

  if (myselfIncluded) {
    map.set(myself, []);
    people.forEach(person => {
      (map.get(myself) as Feeling[]).push({name: person, units: 0});
    });
    people.push(myself);
  }

  let seatings = permute(people);
  seatings.forEach(seating => {
    let totalChange = 0;
    for (let i = 0; i < seating.length; i++) {
      let leftIndex, rightIndex;
      if (i == 0) 
        leftIndex = seating.length - 1;
      else
        leftIndex = i - 1;
      if (i == seating.length - 1)
        rightIndex = 0;
      else
        rightIndex = i + 1;
      let neighbors = [seating[leftIndex], seating[rightIndex]];
      (map.get(seating[i]) as Feeling[]).filter(feeling => neighbors.includes(feeling.name)).forEach(feeling => {
        totalChange += feeling.units;
      });
    }
    if (totalChange > maxTotalChange)
      maxTotalChange = totalChange;
  });

  return maxTotalChange;
};

let answer1 = getAnswer(false);
let answer2 = getAnswer(true);
console.log('Answer 1: ' + answer1);
console.log('Answer 2: ' + answer2);
