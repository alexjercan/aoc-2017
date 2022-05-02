function prepareInput(input) {
  return input.split("\n");
}

function step(grid, row, col, dir, seenLetters) {
  if (grid[row][col] === "+") {
    if (dir === "D") {
      if (grid[row][col + 1] !== " ") {
        dir = "R";
      } else if (grid[row][col - 1] !== " ") {
        dir = "L";
      } else {
        throw new Error("Invalid state");
      }
    } else if (dir === "R") {
      if (grid[row + 1][col] !== " ") {
        dir = "D";
      } else if (grid[row - 1][col] !== " ") {
        dir = "U";
      } else {
        throw new Error("Invalid state");
      }
    } else if (dir === "U") {
      if (grid[row][col + 1] !== " ") {
        dir = "R";
      } else if (grid[row][col - 1] !== " ") {
        dir = "L";
      } else {
        throw new Error("Invalid state");
      }
    } else if (dir === "L") {
      if (grid[row + 1][col] !== " ") {
        dir = "D";
      } else if (grid[row - 1][col] !== " ") {
        dir = "U";
      } else {
        throw new Error("Invalid state");
      }
    } else {
      throw new Error("Invalid state");
    }
  } else if (/[a-zA-Z]/.test(grid[row][col])) {
    seenLetters.push(grid[row][col]);
  }

  switch (dir) {
    case "D":
      row++;
      break;
    case "R":
      col++;
      break;
    case "U":
      row--;
      break;
    case "L":
      col--;
      break;
    default:
      throw new Error("Invalid state");
  }

  return [row, col, dir, seenLetters];
}

function part1(grid) {
  let row = 0;
  let col = 0;
  let dir = "D";
  let seenLetters = []

  for (let i = 0; i < grid[0].length; i++, col++) {
    if (grid[row][col] === "|") {
      break;
    }
  }

  while (true) {
    [row, col, dir, seenLetters] = step(grid, row, col, dir, seenLetters);

    if (grid[row][col] === ' ') {
        break;
    }
  }

  return seenLetters.join("");
}

function part2(grid) {
    let row = 0;
    let col = 0;
    let dir = "D";
    let seenLetters = []
  
    for (let i = 0; i < grid[0].length; i++, col++) {
      if (grid[row][col] === "|") {
        break;
      }
    }
  
    let steps = 1;
    while (true) {
      [row, col, dir, seenLetters] = step(grid, row, col, dir, seenLetters);
  
      if (grid[row][col] === ' ') {
          break;
      }

      steps++;
    }
  
    return steps;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day19\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
