function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((c) => parseInt(c))
    );
}

function part1(input) {
  return input.reduce((acc, row) => {
    return acc + Math.max(...row) - Math.min(...row);
  }, 0);
}

function part2(input) {
  return input.reduce((acc, row) => {
    let sorted = row.sort((a, b) => a - b);
    for (let i = 0; i < sorted.length - 1; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        if (sorted[j] % sorted[i] === 0) {
          return acc + sorted[j] / sorted[i];
        }
      }
    }

    return 0;
  }, 0);
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day02\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
