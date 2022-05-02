function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => parseInt(line.split(" ")[4].trim()));
}

const GENERATOR_A = 16807;
const GENERATOR_B = 48271;
const DIVISION_MODULO = 2147483647;

function nextValue(value, factor, divisor) {
  return (value * factor) % divisor;
}

function compare16bits(a, b) {
  return (a & 0xffff) === (b & 0xffff);
}

function part1(input) {
  let a = input[0];
  let b = input[1];

  let count = 0;
  for (let i = 0; i < 40_000_000; ++i) {
    a = nextValue(a, GENERATOR_A, DIVISION_MODULO);
    b = nextValue(b, GENERATOR_B, DIVISION_MODULO);

    if (compare16bits(a, b)) {
      ++count;
    }
  }

  return count;
}

function part2(input) {
  let a = input[0];
  let b = input[1];

  let count = 0;
  for (let i = 0; i < 5_000_000; ++i) {
    a = nextValue(a, GENERATOR_A, DIVISION_MODULO);
    while (a % 4 !== 0) {
      a = nextValue(a, GENERATOR_A, DIVISION_MODULO);
    }
    b = nextValue(b, GENERATOR_B, DIVISION_MODULO);
    while (b % 8 !== 0) {
      b = nextValue(b, GENERATOR_B, DIVISION_MODULO);
    }

    if (compare16bits(a, b)) {
      ++count;
    }
  }

  return count;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day15\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
