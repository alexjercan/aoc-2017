function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(" "));
}

function getValue(registers, value) {
  if (value.match(/^[a-z]$/)) {
    return registers[value];
  } else {
    return parseInt(value, 10);
  }
}

function step(instructions, registers, ip) {
  const instruction = instructions[ip];

  switch (instruction[0]) {
    case "set":
      registers[instruction[1]] = getValue(registers, instruction[2]);
      ip++;
      break;
    case "sub":
      registers[instruction[1]] -= getValue(registers, instruction[2]);
      ip++;
      break;
    case "mul":
      registers[instruction[1]] *= getValue(registers, instruction[2]);
      ip++;
      break;
    case "jnz":
      if (getValue(registers, instruction[1]) !== 0) {
        ip += getValue(registers, instruction[2]);
      } else {
        ip++;
      }
      break;
    default:
      throw new Error(`Unknown instruction: ${instruction[0]}`);
  }

  return [registers, ip];
}

function part1(input) {
  let instructions = input;
  let registers = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 };
  let ip = 0;

  let count = 0;
  while (0 <= ip && ip < instructions.length) {
    if (instructions[ip][0] === "mul") {
      count++;
    }
    [registers, ip] = step(instructions, registers, ip);
  }

  return count;
}

function part2(input) {
  let r = {
    b: 57,
    c: 57,
    d: 0,
    f: 0,
    g: 0,
    h: 0,
  };
  r["b"] = r["b"] * 100 + 100000;
  r["c"] = r["b"] + 17000;
  do {
    r["f"] = 1;
    r["d"] = 2;
    for (let d = r["d"]; d * d < r["b"]; ++d) {
      if (r["b"] % d === 0) {
        r["f"] = 0;
        break;
      }
    }
    if (r["f"] === 0) r["h"]++;
    r["g"] = r["b"] - r["c"];
    r["b"] += 17;
  } while (r["g"] !== 0);

  return r["h"];
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day23\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
