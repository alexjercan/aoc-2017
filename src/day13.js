function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [depth, range] = line.split(": ").map((x) => parseInt(x));
      return { depth, range };
    });
}

function scannerPosition(layer, range, delay) {
  return (layer + delay) % (2 * range - 2);
}

function part1(input) {
  let severity = 0;
  for (const layer of input) {
    const { depth, range } = layer;
    if (scannerPosition(depth, range, 0) === 0) {
      severity += depth * range;
    }
  }

  return severity;
}

function part2(input) {
  let delay = 0;

  while (true) {
    let caught = false;
    for (const layer of input) {
      const { depth, range } = layer;
      if (scannerPosition(depth, range, delay) === 0) {
        caught = true;
        break;
      }
    }

    if (!caught) {
      return delay;
    }

    delay++;
  }
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day13\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
