function prepareInput(input) {
  return input.trim().split(",");
}

function part1(input) {
  let x = 0;
  let y = 0;
  let z = 0;

  for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
      case "n":
        y++;
        z--;
        break;
      case "ne":
        x++;
        z--;
        break;
      case "se":
        x++;
        y--;
        break;
      case "s":
        y--;
        z++;
        break;
      case "sw":
        x--;
        z++;
        break;
      case "nw":
        x--;
        y++;
        break;
    }
  }

  return (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;
}

function part2(input) {
  let x = 0;
  let y = 0;
  let z = 0;

  const dists = [];

  for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
      case "n":
        y++;
        z--;
        break;
      case "ne":
        x++;
        z--;
        break;
      case "se":
        x++;
        y--;
        break;
      case "s":
        y--;
        z++;
        break;
      case "sw":
        x--;
        z++;
        break;
      case "nw":
        x--;
        y++;
        break;
    }

    dists.push((Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2);
  }

  return Math.max(...dists);
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day11\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
