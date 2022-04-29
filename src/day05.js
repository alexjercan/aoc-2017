function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .map((word) => parseInt(word.trim()));
}

function step(xs, ip) {
    const offset = xs[ip];
    xs[ip] += 1;
    ip += offset;

    return xs, ip;
}

function part1(input) {
    // copy input into xs using slice
    let xs = input.slice();
    let ip = 0;
    let count = 0;

    while (ip >= 0 && ip < xs.length) {
        xs, ip = step(xs, ip);
        count += 1;
    }

    return count;
}

function stepPart2(xs, ip) {
    const offset = xs[ip];
    xs[ip] = offset >= 3 ? xs[ip] - 1 : xs[ip] + 1;
    ip += offset;

    return xs, ip;
}

function part2(input) {
    let xs = input.slice();
    let ip = 0;
    let count = 0;

    while (ip >= 0 && ip < xs.length) {
        xs, ip = stepPart2(xs, ip);
        count += 1;
    }

    return count;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day05\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
