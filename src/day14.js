function prepareInput(input) {
  return input.trim();
}

function knotHash(string) {
  function hash(list, lengths, i, skip) {
    const len = list.length;
    lengths.forEach((v) => {
      [...Array(v).keys()]
        .map((k) => list[(k + i) % len])
        .reverse()
        .forEach((val, k) => (list[(k + i) % len] = val));
      i += v + skip;
      skip++;
    });
    return [list, i, skip];
  }

  string = string.split("").map((v) => v.charCodeAt(0));
  string.push(17, 31, 73, 47, 23);

  let list = [...Array(256).keys()];
  let i = 0;
  let skip = 0;
  for (let k = 0; k < 64; ++k) {
    [list, i, skip] = hash(list, string, i, skip);
  }

  let dense = [];
  for (let k = 0; k < 16; ++k) {
    dense.push(list.slice(k * 16, k * 16 + 16).reduce((a, b) => a ^ b));
  }

  return dense.map((v) => v.toString(16).padStart(2, "0")).join("");
}

function countSetBits(hexStr) {
  function countSetBits16(c) {
    switch (c) {
      case "0":
        return 0;
      case "1":
        return 1;
      case "2":
        return 1;
      case "3":
        return 2;
      case "4":
        return 1;
      case "5":
        return 2;
      case "6":
        return 2;
      case "7":
        return 3;
      case "8":
        return 1;
      case "9":
        return 2;
      case "a":
        return 2;
      case "b":
        return 3;
      case "c":
        return 2;
      case "d":
        return 3;
      case "e":
        return 3;
      case "f":
        return 4;
    }
  }

  let count = 0;
  for (const c of hexStr) {
    count += countSetBits16(c);
  }

  return count;
}

function floodFill(grid, x, y) {
  const queue = [[x, y]];
  const visited = new Set();
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    if (x >= 0 && x < 128 && y >= 0 && y < 128 && grid[x][y] === "1" && !visited.has(`${x}-${y}`)) {
      visited.add(`${x}-${y}`);
      queue.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
    }
  }
  return visited;
}

function part1(input) {
  let count = 0;

  for (let i = 0; i < 128; ++i) {
    count += countSetBits(knotHash(`${input}-${i}`));
  }

  return count;
}

function part2(input) {
  function hexToBin(c) {
    switch (c) {
      case "0":
        return "0000";
      case "1":
        return "0001";
      case "2":
        return "0010";
      case "3":
        return "0011";
      case "4":
        return "0100";
      case "5":
        return "0101";
      case "6":
        return "0110";
      case "7":
        return "0111";
      case "8":
        return "1000";
      case "9":
        return "1001";
      case "a":
        return "1010";
      case "b":
        return "1011";
      case "c":
        return "1100";
      case "d":
        return "1101";
      case "e":
        return "1110";
      case "f":
        return "1111";
    }
  }

  const grid = [];

  for (let i = 0; i < 128; ++i) {
    grid.push(knotHash(`${input}-${i}`).split("").map((v) => hexToBin(v)).join("").split(""));
  }

  let regions = 0;
  let visited = new Set();
  for (let x = 0; x < 128; ++x) {
    for (let y = 0; y < 128; ++y) {
      if (grid[x][y] === "1" && !visited.has(`${x}-${y}`)) {
        visited = new Set([...visited, ...floodFill(grid, x, y)]);
        regions++;
      }
    }
  }

  return regions;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day14\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
