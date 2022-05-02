function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .reduce((dict, curr) => {
      const [idx, list] = curr.split(" <-> ");
      dict.set(
        parseInt(idx),
        list.split(", ").map((x) => parseInt(x))
      );
      return dict;
    }, new Map());
}

function part1(graph) {
  const start = 0;
  const visited = new Set();
  const queue = [start];
  let count = 0;

  while (queue.length > 0) {
    const curr = queue.shift();
    if (visited.has(curr)) continue;
    visited.add(curr);
    count++;
    graph.get(curr).forEach((x) => queue.push(x));
  }

  return count;
}

function part2(input) {
  const notVisited = new Set(input.keys());
  let groups = 0;

  while (notVisited.size > 0) {
    const start = notVisited.values().next().value;
    const visited = new Set();
    const queue = [start];

    while (queue.length > 0) {
      const curr = queue.shift();
      if (visited.has(curr)) continue;
      visited.add(curr);
      input.get(curr).forEach((x) => queue.push(x));
    }

    groups++;
    visited.forEach((x) => notVisited.delete(x));
  }

  return groups;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day12\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
