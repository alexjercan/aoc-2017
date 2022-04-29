function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .reduce((acc, line) => {
      const [left, right] = line.split(" -> ");
      const name = left.split(" ")[0];
      const weight = parseInt(left.split(" ")[1].replace(/\(|\)/g, ""));
      const children = right ? right.split(", ") : [];
      acc.set(name, { weight, children });
      return acc;
    }, new Map());
}

function part1(input) {
  const set = Array.from(input.values()).reduce((acc, { children }) => {
    children.forEach((child) => acc.add(child));
    return acc;
  }, new Set());

  return Array.from(input.keys()).find((key) => !set.has(key));
}

function dfs(node, input) {
  const { children, weight } = input.get(node);
  const results = children.map((child) => dfs(child, input));

  if (results.length > 0) {
    const result = results.find((result) => typeof result === "number");
    if (result) {
      return result;
    }

    const weights = results.map(({ weight }) => weight);
    const uniqueWeights = Array.from(new Set(weights));
    if (uniqueWeights.length > 1) {
      let unique0 = 0;
      for (let i = 0; i < weights.length; i++) {
        if (weights[i] == uniqueWeights[0]) {
          unique0 += 1;
        }
      }

      let diff = 0;
      let index = 0;
      if (unique0 == 1) {
        diff = uniqueWeights[0] - uniqueWeights[1];
        index = weights.indexOf(uniqueWeights[0]);
      } else {
        diff = uniqueWeights[1] - uniqueWeights[0];
        index = weights.indexOf(uniqueWeights[1]);
      }
      let badChild = children[index];
      return input.get(badChild).weight - diff;
    }
  }

  return {
    weight: results.reduce((acc, { weight }) => acc + weight, weight),
  };
}

function part2(input) {
  const root = part1(input);
  return dfs(root, input);
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day07\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
