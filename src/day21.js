function rule(str, rules) {
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 4; j++) {
      let s = morph(str, j, i);
      if (rules.hasOwnProperty(s)) return rules[s];
    }
}

function morph(str, rotate, flip) {
  let s = str.split("/");
  if (flip) s.reverse();

  for (let r = 0; r < rotate; r++) {
    let n = [];
    for (let i = 0; i < s.length; i++) {
      let news = "";
      for (let j = s.length - 1; j >= 0; j--) news += s[j][i];
      n.push(news);
    }
    s = n;
  }
  return s.join("/");
}

function getSubgrids(grid) {
  let num = grid.length % 2 == 0 ? 2 : 3;
  let strs = [];
  for (let i = 0; i < grid.length; i += num)
    for (let j = 0; j < grid.length; j += num) {
      let str = "";
      for (let k = 0; k < num; k++)
        str += grid[i + k].substring(j, j + num) + "/";
      strs.push(str.substr(0, str.length - 1));
    }
  return strs;
}

function reform(arr) {
  let g = [];
  let num = Math.sqrt(arr.length);
  let strlen = arr[0].match(/\//g).length + 1;
  for (let i = 0; i < arr.length; i += num)
    for (let j = 0; j < strlen; j++) {
      let str = "";
      for (let k = 0; k < num; k++) str += arr[i + k].split("/")[j];
      g.push(str);
    }
  return g;
}

function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .reduce((acc, line) => {
      const [key, value] = line.split(" => ");
      acc[key] = value;
      return acc;
    }, {});
}

function part(n, rules) {
  let grid = [".#.", "..#", "###"];
  for (let loop = 0; loop < n; loop++) {
    let sub = getSubgrids(grid);
    for (let l = 0; l < sub.length; l++) {
      sub[l] = rule(sub[l], rules);
    }
    grid = reform(sub);
  }
  let count = grid.reduce((a, b) => a + b.match(/#/g).length, 0);
  return count;
}

function part1(rules) {
  return part(5, rules);
}

function part2(rules) {
  return part(18, rules);
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day21\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
