function prepareInput(input) {
  return input
    .trim()
    .split(/\s+/)
    .map((c) => parseInt(c));
}

function arraysMatch(arr1, arr2) {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  // Otherwise, return true
  return true;
}

function containsArray(arr, target) {
  return arr.some((a) => arraysMatch(a, target));
}

function indexOfContained(arr, target) {
  return arr.findIndex((a) => arraysMatch(a, target));
}

function part1(input) {
  let xs = input.slice();
  const n = xs.length;

  let visited = [xs.slice()];

  let count = 1;
  while (true) {
    let max = Math.max(...xs);
    let maxIndex = xs.indexOf(max);

    xs[maxIndex] = 0;
    while (max > 0) {
      maxIndex = (maxIndex + 1) % n;
      xs[maxIndex]++;
      max--;
    }

    if (containsArray(visited, xs)) {
      return count;
    }

    visited.push(xs.slice());
    count += 1;
  }
}

function part2(input) {
  let xs = input.slice();
  const n = xs.length;

  let visited = [xs.slice()];

  let count = 1;
  while (true) {
    let max = Math.max(...xs);
    let maxIndex = xs.indexOf(max);

    xs[maxIndex] = 0;
    while (max > 0) {
      maxIndex = (maxIndex + 1) % n;
      xs[maxIndex]++;
      max--;
    }

    if (containsArray(visited, xs)) {
      return visited.length - indexOfContained(visited, xs);
    }

    visited.push(xs.slice());
    count += 1;
  }
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day06\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
