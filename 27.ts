import {readFileSync} from 'fs';

interface Reindeer {
  name: string;
  speed: number;
  durable: number;
  rest: number;
}

const getAnswer = () => {
  let lines: string[] = readFileSync('./inputs/14.txt', 'utf8').split("\n");
  let reindeers: Reindeer[] = [];
  let max = 0;
  lines.forEach(line => {
    let matches = line.match(/^([A-Za-z]+) can fly (\d+) km\/s for (\d+) seconds\, .+ (\d+) seconds\.$/);
    if (matches !== null && matches.length == 5) {
      let name = matches[1];
      let speed = +(matches[2]);
      let durable = +(matches[3]);
      let rest = +(matches[4]);
      reindeers.push({name: name, speed: speed, durable: durable, rest: rest});
    } else {
      console.log('unexpected line format', line);
    }
  });

  let race = 2503;
  reindeers.forEach(reindeer => {
    let cycleKm = reindeer.speed * reindeer.durable;
    let cycleSecs = reindeer.durable + reindeer.rest;
    let howManyCycles = Math.floor(race / cycleSecs);
    let remainder = race % cycleSecs;
    let remainderKm = remainder >= reindeer.durable ? cycleKm : reindeer.speed * remainder;
    let totalDistance = howManyCycles * cycleKm + remainderKm;
    if (totalDistance > max) max = totalDistance;
  });

  return max;
};

let answer = getAnswer();
console.log('Answer: ' + answer);
