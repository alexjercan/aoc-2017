function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(" "));
}

function part1(input) {
  return input.filter((words) =>
    Array.from(
      words
        .reduce(
          (acc, word) => acc.set(word, (acc.get(word) || 0) + 1),
          new Map()
        )
        .values()
    ).reduce((acc, count) => acc && count === 1, true)
  ).length;
}

function part2(input) {
  return input.filter((words) =>
    Array.from(
      words
        .reduce(
          (acc, word) =>
            acc.set(
              word.split("").sort().join(""),
              (acc.get(word.split("").sort().join("")) || 0) + 1
            ),
          new Map()
        )
        .values()
    ).reduce((acc, count) => acc && count === 1, true)
  ).length;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day04\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
