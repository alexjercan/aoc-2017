function prepareInput(input) {
  return input.trim();
}

function part1(input) {
  let depth = 0;
  let score = 0;
  let garbage = false;

  for (let i = 0; i < input.length; i++) {
    if (input[i] == "!") {
      i++;
      continue;
    }

    if (garbage) {
      if (input[i] == ">") {
        garbage = false;
      }
    } else {
      if (input[i] == "{") {
        depth += 1;
      } else if (input[i] == "}") {
        score += depth;
        depth -= 1;
      } else if (input[i] == "<") {
        garbage = true;
      }
    }
  }

  return score;
}

function part2(input) {
    let count = 0;
    let garbage = false;
  
    for (let i = 0; i < input.length; i++) {
      if (input[i] == "!") {
        i++;
        continue;
      }
  
      if (garbage) {
        if (input[i] == ">") {
          garbage = false;
        } else {
            count++;
        }
      } else {
        if (input[i] == "<") {
          garbage = true;
        }
      }
    }
  
    return count;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day09\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
