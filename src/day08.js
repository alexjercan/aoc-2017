function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const words = line.trim().split(" ");
      const register = words[0];
      const operator = words[1];
      const value = (operator === "inc" ? 1 : -1) * parseInt(words[2]);
      const conditionRegister = words[4];
      const conditionOperator = words[5];
      const conditionNumber = parseInt(words[6]);

      return {
        register,
        value,
        conditionRegister,
        conditionOperator,
        conditionNumber,
      };
    });
}

function evalCondition(
  registers,
  conditionRegister,
  conditionOperator,
  conditionNumber
) {
  function getValue(register) {
    return registers.get(register) || 0;
  }

  switch (conditionOperator) {
    case ">":
      return getValue(conditionRegister) > conditionNumber;
    case ">=":
      return getValue(conditionRegister) >= conditionNumber;
    case "<":
      return getValue(conditionRegister) < conditionNumber;
    case "<=":
      return getValue(conditionRegister) <= conditionNumber;
    case "==":
      return getValue(conditionRegister) === conditionNumber;
    case "!=":
      return getValue(conditionRegister) !== conditionNumber;
    default:
      throw new Error(`Unknown operator ${conditionOperator}`);
  }
}

function part1(input) {
  const registers = new Map();

  input.forEach(
    ({
      register,
      value,
      conditionRegister,
      conditionOperator,
      conditionNumber,
    }) => {
      if (
        evalCondition(
          registers,
          conditionRegister,
          conditionOperator,
          conditionNumber
        )
      ) {
        registers.set(register, (registers.get(register) || 0) + value);
      }
    }
  );

  return Math.max(...Array.from(registers.values()));
}

function part2(input) {
  const registers = new Map();
  let maximumValue = 0;

  input.forEach(
    ({
      register,
      value,
      conditionRegister,
      conditionOperator,
      conditionNumber,
    }) => {
      if (
        evalCondition(
          registers,
          conditionRegister,
          conditionOperator,
          conditionNumber
        )
      ) {
        const v = (registers.get(register) || 0) + value;
        registers.set(register, v);
        if (v > maximumValue) {
          maximumValue = v;
        }
      }
    }
  );

  return maximumValue;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day08\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
