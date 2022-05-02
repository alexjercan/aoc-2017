function prepareInput(input) {
  return input.split(",").map((n) => parseInt(n));
}

function hash(list, lengths, i, skip) {
  const len = list.length;
  lengths.forEach((v) => {
    [...Array(v).keys()]
      .map((k) => list[(k + i) % len])
      .reverse()
      .forEach((val, k) => (list[(k + i) % len] = val));
    i += v + skip;
    skip++;
  });
  return [list, i, skip];
}

function part1(lengths) {
  let [list] = hash([...Array(256).keys()], lengths, 0, 0);
  return list[0] * list[1];
}

function part2(lengths) {
  lengths = lengths.split("").map((v) => v.charCodeAt(0));
  lengths.push(17, 31, 73, 47, 23);

  let list = [...Array(256).keys()];
  let i = 0;
  let skip = 0;
  for (let k = 0; k < 64; ++k) {
    [list, i, skip] = hash(list, lengths, i, skip);
  }

  let dense = [];
  for (let k = 0; k < 16; ++k) {
    dense.push(list.slice(k * 16, k * 16 + 16).reduce((a, b) => a ^ b));
  }

  return dense.map((v) => v.toString(16).padStart(2, "0")).join("");
}

export default function solve(input) {
  return (
    "Day10\nPart1: " +
    part1(prepareInput(input)) +
    "\nPart2: " +
    part2(input.trim()) +
    "\n"
  );
}
