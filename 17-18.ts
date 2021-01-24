import {readFileSync} from 'fs';

const map = new Map<string, number>();

const getKey = (c1:string, c2:string): string => {
  return `${c1}_${c2}`;
};

const getAnswer = (): number[] => {
  let data = readFileSync('./inputs/09.txt', 'utf8').split("\n");
  let cities = [];
  data.forEach(line => {
    let routeAndDist = line.split(' = ');
    let dAndA = routeAndDist[0].split(' to ');
    dAndA.forEach(city => {
      if (!cities.includes(city)) 
        cities.push(city);
    });
    map.set(getKey(dAndA[0], dAndA[1]), parseInt(routeAndDist[1]));
  });

  let routes = [], nOfCity = cities.length;
  const walk = (cur, rest) => {
    if (cur.length == nOfCity) {
      routes.push(cur);
    } else {
      for (let i = 0; i < rest.length; i++) {
        let newCur = [...cur, rest[i]];
        let newRest = rest.slice();
        newRest.splice(i, 1);
        walk(newCur, newRest);
      }
    }
  };
  walk([], cities);

  let shortest = Number.MAX_SAFE_INTEGER,
    longest = 0;
  routes.forEach(route => {
    let dist = 0;
    for (let i = 0; i < route.length - 1; i++) {
      let distBetweenTwoCity:number|undefined = map.get(getKey(route[i], route[i + 1]));
      if (typeof distBetweenTwoCity === 'undefined')
        distBetweenTwoCity = map.get(getKey(route[i + 1], route[i]));
      if (typeof distBetweenTwoCity === 'undefined')
        throw "Unknown distance.";
      dist += distBetweenTwoCity;
    }
    if (dist < shortest)
      shortest = dist;
    if (dist > longest)
      longest = dist;
  });
  return [shortest, longest];
};

let answer = getAnswer();
console.log(answer);