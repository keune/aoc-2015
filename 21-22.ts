const unwantedReg = /[iol]/;

const incrementLetter = (l:string) : string => {
  if (l === 'z') return 'a';
  return String.fromCharCode(l.charCodeAt(0) + 1);
};

const replaceChar = (str: string, index: number, newChar: string): string => {
  return str.substr(0, index) + newChar + str.substr(index + 1);
};

const uniqArr = (arr: any[]): any[] => {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};

const increment = (password: string) :string => {
  if (unwantedReg.test(password)) {
    let matches = password.match(unwantedReg);
    if (matches !== null && matches.length) {
      let leftmostUnwanted = password[matches.index!];
      return password.substr(0, matches.index!) + incrementLetter(leftmostUnwanted) + 'a'.repeat(password.length - matches.index! - 1);
    }
  }

  for (let i = password.length-1; i >= 0; i--) {
    if (password[i] === 'z') {
      let pArr = password.split('');
      pArr[i] = 'a';
      password = pArr.join('');
      continue;
    } else {
      return replaceChar(password, i, incrementLetter(password[i]));
    }
  }

  return '';
};

const isValid = (p: string): boolean => {
  if (unwantedReg.test(p)) return false;

  let twoSameMatches = p.match(/([a-z])\1/g);
  if (twoSameMatches === null || uniqArr(twoSameMatches).length < 2) return false;
  
  for (let i = 0; i < p.length - 2; i++) {
    let currentStraight = 0;
    let cc1 = p.charCodeAt(i);
    let cc2 = p.charCodeAt(i+1);
    if (cc2 - cc1 == 1) {
      let cc3 = p.charCodeAt(i+2);
      if (cc3 - cc2 == 1) {
        return true;
      }
    }
  }

  return false;
};

const getAnswer = (password: string) => {
  let newPassword = increment(password);

  while (!isValid(newPassword)) {
    newPassword = increment(newPassword);
  }

  return newPassword;
};

let answer1 = getAnswer('cqjxjnds');
console.log(`Answer 1: ${answer1}`);
let answer2 = getAnswer(answer1);
console.log(`Answer 2: ${answer2}`);
