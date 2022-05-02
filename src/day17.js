function prepareInput(input) {
  return parseInt(input.trim());
}

function part1(n) {
  const buffer = [0];
  let pos = 0;

  for (let i = 1; i <= 2017; i++) {
    pos = (pos + n) % buffer.length;
    buffer.splice(pos + 1, 0, i);
    pos++;
  }

  return buffer[(pos + 1) % buffer.length];
}

function part2(n) {
  let size = 1;
  let pos = 0;
  let out = 0;
  for (let i = 1; i <= 50000000; i++) {
    pos = (pos + n) % size;
    if (pos == 0) {
      out = i;
    }
    pos++;
    size++;
  }

  return out;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day17\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
