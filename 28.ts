import {readFileSync} from 'fs';

class Reindeer {
  name: string;
  speed: number;
  durable: number;
  rest: number;
  totalDistance: number;
  totalPoints: number;
  cycleKm: number;
  cycleSecs: number;
 
  constructor(name: string, speed: number, durable: number, rest: number) {
    this.name = name;
    this.speed = speed;
    this.durable = durable;
    this.rest = rest;
    this.cycleKm = this.speed * this.durable;
    this.cycleSecs = this.durable + this.rest;
    this.totalDistance = 0;
    this.totalPoints = 0;
  }
}

const getAnswer = () => {
  let lines: string[] = readFileSync('./inputs/14.txt', 'utf8').split("\n"),
    reindeers: Map<string, Reindeer> = new Map<string, Reindeer>(),
    max = 0,
    race = 2503;

  lines.forEach(line => {
    let matches = line.match(/^([A-Za-z]+) can fly (\d+) km\/s for (\d+) seconds\, .+ (\d+) seconds\.$/);
    if (matches !== null && matches.length == 5) {
      let name = matches[1];
      let speed = +(matches[2]);
      let durable = +(matches[3]);
      let rest = +(matches[4]);
      reindeers.set(name, new Reindeer(name, speed, durable, rest));
    } else {
      console.log('unexpected line format', line);
    }
  });

  for (let i = 1; i <= race; i++) {
    let maxDistanceForThisSecond = 0;
    [...reindeers.values()].forEach(reindeer => {
      let howManyCycles = Math.floor(i / reindeer.cycleSecs);
      let remainder = i % reindeer.cycleSecs;
      let remainderKm = remainder >= reindeer.durable ? reindeer.cycleKm : reindeer.speed * remainder;
      let totalDistance = howManyCycles * reindeer.cycleKm + remainderKm;

      if (totalDistance > maxDistanceForThisSecond) maxDistanceForThisSecond = totalDistance;
      
      (reindeers.get(reindeer.name)!).totalDistance = totalDistance;
    });

    [...reindeers.values()].filter(r => r.totalDistance === maxDistanceForThisSecond).forEach(r => {
      (reindeers.get(r.name)!).totalPoints += 1;
    });
  }

  [...reindeers.values()].forEach(r => {
    if (r.totalPoints > max) max = r.totalPoints;
  });

  return max;
};

let answer = getAnswer();
console.log('Answer: ' + answer);
