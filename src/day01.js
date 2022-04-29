function prepareInput(input) {
  return input
    .trim()
    .split("")
    .map((c) => parseInt(c));
}

function part1(input) {
  let sum = 0;

  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] === input[i + 1]) {
      sum += input[i];
    }
  }
  if (input[0] === input[input.length - 1]) {
    sum += input[0];
  }

  return sum;
}

function part2(input) {
  let sum = 0;
  let half = Math.floor(input.length / 2);

  for (let i = 0; i < input.length; i++) {
    if (input[i] === input[(i + half) % input.length]) {
      sum += input[i];
    }
  }

  return sum;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day01\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
