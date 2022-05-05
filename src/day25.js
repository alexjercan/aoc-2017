function parseState(state) {
  const lines = state.split("\n");

  const name = lines[0].split(" ")[2].split(":")[0];
  const rules = {};

  for (let i = 1; i < lines.length; i += 4) {
    const rule = parseInt(lines[i].trim().split(" ")[5].split(":")[0]);
    const write = parseInt(lines[i + 1].trim().split(" ")[4].split(".")[0]);
    let move = 0;
    const moveStr = lines[i + 2].trim().split(" ")[6].split(".")[0];
    if (moveStr === "left") {
        move = -1;
    } else if (moveStr === "right") {
        move = 1;
    }
    const state = lines[i + 3].trim().split(" ")[4].split(".")[0];
    rules[rule] = { write, move, state };
  }

  return { name, rules };
}

function prepareInput(input) {
  const [start, ...states] = input.trim().split("\n\n");

  const [startStateLine, checksumStepsLine] = start.split("\n");
  const startState = startStateLine.split(" ")[3].split(".")[0];
  const checksumSteps = parseInt(checksumStepsLine.split(" ")[5]);

  const transitions = {};
  for (let i = 0; i < states.length; i++) {
    const state = parseState(states[i]);
    transitions[state.name] = state.rules;
  }

  return { startState, checksumSteps, transitions };
}

function step(state, cursor, tape, transitions) {
  const value = tape[cursor] || 0;
  const rule = transitions[state][value];

  tape[cursor] = rule.write;
  cursor += rule.move;
  state = rule.state;

  return [state, cursor, tape];
}

function part1(input) {
  const { startState, checksumSteps, transitions } = input;

  let state = startState;
  let cursor = 0;
  let tape = {};

  for (let i = 0; i < checksumSteps; i++) {
    [state, cursor, tape] = step(state, cursor, tape, transitions);
  }

  return Object.values(tape).reduce((acc, val) => acc + val, 0);
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day25\nPart1: " + part1(input) + "\n";
}
