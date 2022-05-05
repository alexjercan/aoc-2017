function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [x, y] = line
        .trim()
        .split("/")
        .map((x) => parseInt(x));
      return { x, y };
    });
}

function step(bridges, components) {
  const nextBridges = [];
  let updated = false;

  for (let bridge of bridges) {
    const lastComponent = bridge[bridge.length - 1];

    const unused = components.filter((component) => {
      for (let used of bridge) {
        if (
          (used.x === component.x && used.y === component.y) ||
          (used.x === component.y && used.y === component.x)
        ) {
          return false;
        }
      }
      return true;
    });

    for (let component of unused) {
      if (component.x === lastComponent.y) {
        nextBridges.push([...bridge, component]);
        updated = true;
      } else if (component.y === lastComponent.y) {
        nextBridges.push([...bridge, { x: component.y, y: component.x }]);
        updated = true;
      }
    }
  }

  return [nextBridges, updated];
}

function part1(components) {
  const startComponents = components.filter(
    (component) => component.x === 0 || component.y === 0
  );
  let bridges = startComponents.map((c) => [c]);
  let allBridges = [...bridges];
  let updated = true;

  while (updated) {
    [bridges, updated] = step(bridges, components);
    allBridges = [...allBridges, ...bridges];
  }

  let max = 0;
  for (let bridge of allBridges) {
    let sum = 0;
    for (let component of bridge) {
      sum += component.x + component.y;
    }

    if (sum > max) {
      max = sum;
    }
  }

  return max;
}

function part2(components) {
  const startComponents = components.filter(
    (component) => component.x === 0 || component.y === 0
  );
  let bridges = startComponents.map((c) => [c]);
  let allBridges = [...bridges];
  let updated = true;

  while (updated) {
    [bridges, updated] = step(bridges, components);
    allBridges = [...allBridges, ...bridges];
  }

  let maxLength = 0;
  let max = 0;
  for (let bridge of allBridges) {
    let sum = 0;
    for (let component of bridge) {
      sum += component.x + component.y;
    }

    if (bridge.length > maxLength) {
      maxLength = bridge.length;
      max = sum;
    } else if (bridge.length === maxLength && sum > max) {
      max = sum;
    }
  }

  return max;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day24\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
