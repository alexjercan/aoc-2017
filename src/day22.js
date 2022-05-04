function pointToKey(point) {
  return `${point.row},${point.col}`;
}

function prepareInput(input) {
  const map = input.trim().split("\n");
  const nrows = map.length;
  const ncols = map[0].length;

  const result = new Set();

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === "#") {
        result.add(
          pointToKey({
            row: row - Math.floor(nrows / 2),
            col: col - Math.floor(ncols / 2),
          })
        );
      }
    }
  }

  return result;
}

function turnTo(carrier, direction) {
  switch (carrier.facing) {
    case "up":
      if (direction === "left") {
        carrier.facing = "left";
      } else if (direction === "right") {
        carrier.facing = "right";
      }
      break;
    case "down":
      if (direction === "left") {
        carrier.facing = "right";
      } else if (direction === "right") {
        carrier.facing = "left";
      }
      break;
    case "left":
      if (direction === "left") {
        carrier.facing = "down";
      } else if (direction === "right") {
        carrier.facing = "up";
      }
      break;
    case "right":
      if (direction === "left") {
        carrier.facing = "up";
      } else if (direction === "right") {
        carrier.facing = "down";
      }
      break;
  }

  return carrier;
}

function moveForward(carrier) {
  switch (carrier.facing) {
    case "up":
      carrier.row -= 1;
      break;
    case "down":
      carrier.row += 1;
      break;
    case "left":
      carrier.col -= 1;
      break;
    case "right":
      carrier.col += 1;
      break;
  }

  return carrier;
}

function step(infectedNodes, carrier) {
  if (infectedNodes.has(pointToKey({ row: carrier.row, col: carrier.col }))) {
    infectedNodes.delete(pointToKey({ row: carrier.row, col: carrier.col }));
    carrier = turnTo(carrier, "right");
    carrier = moveForward(carrier);
  } else {
    infectedNodes.add(pointToKey({ row: carrier.row, col: carrier.col }));
    carrier = turnTo(carrier, "left");
    carrier = moveForward(carrier);
    carrier.infections++;
  }

  return [infectedNodes, carrier];
}

function part1(input) {
  let infectedNodes = new Set(input);
  let carrier = {
    row: 0,
    col: 0,
    facing: "up",
    infections: 0,
  };

  for (let i = 0; i < 10_000; i++) {
    [infectedNodes, carrier] = step(infectedNodes, carrier);
  }

  return carrier.infections;
}

function step2(infectedNodes, weakenedNodes, flaggedNodes, carrier) {
  if (infectedNodes.has(pointToKey({ row: carrier.row, col: carrier.col }))) {
    infectedNodes.delete(pointToKey({ row: carrier.row, col: carrier.col }));
    flaggedNodes.add(pointToKey({ row: carrier.row, col: carrier.col }));
    carrier = turnTo(carrier, "right");
    carrier = moveForward(carrier);
  } else if (
    weakenedNodes.has(pointToKey({ row: carrier.row, col: carrier.col }))
  ) {
    weakenedNodes.delete(pointToKey({ row: carrier.row, col: carrier.col }));
    infectedNodes.add(pointToKey({ row: carrier.row, col: carrier.col }));
    carrier = moveForward(carrier);
    carrier.infections++;
  } else if (
    flaggedNodes.has(pointToKey({ row: carrier.row, col: carrier.col }))
  ) {
    flaggedNodes.delete(pointToKey({ row: carrier.row, col: carrier.col }));
    carrier = turnTo(carrier, "left");
    carrier = turnTo(carrier, "left");
    carrier = moveForward(carrier);
  } else {
    weakenedNodes.add(pointToKey({ row: carrier.row, col: carrier.col }));
    carrier = turnTo(carrier, "left");
    carrier = moveForward(carrier);
  }

  return [infectedNodes, weakenedNodes, flaggedNodes, carrier];
}

function part2(input) {
  let infectedNodes = new Set(input);
  let weakenedNodes = new Set();
  let flaggedNodes = new Set();
  let carrier = {
    row: 0,
    col: 0,
    facing: "up",
    infections: 0,
  };

  for (let i = 0; i < 10_000_000; i++) {
    [infectedNodes, weakenedNodes, flaggedNodes, carrier] = step2(
      infectedNodes,
      weakenedNodes,
      flaggedNodes,
      carrier
    );
  }

  return carrier.infections;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day22\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
