function prepareInput(input) {
  return parseInt(input.trim());
}

function part1(input) {
  let oddSquares = [];
  const sqrtInput = Math.sqrt(input);
  for (let i = 1; i < sqrtInput; i++) {
    const square = i * i;
    if (square % 2 === 1) {
      oddSquares.push(square);
    }
  }

  const circle = oddSquares.length;
  const index =
    circle === 0
      ? 0
      : Math.abs(circle - ((input - oddSquares[circle - 1]) % (circle * 2)));

  return index + circle;
}

function part2(input) {
  // https://oeis.org/A141481

  const m = 7;
  const h = 2 * m - 1;
  const A = Array(h + 1)
    .fill(0)
    .map(() => Array(h + 1).fill(0));
  A[m][m] = 1;
  const T = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  for (let n = 1; n <= (h - 2) ** 2 - 1; n++) {
    const g = Math.floor(Math.sqrt(n));
    const r = (g + (g % 2)) / 2;
    const q = 4 * r ** 2;
    const d = n - q;

    let j, k;
    if (n <= q - 2 * r) {
      j = d + 3 * r;
      k = r;
    } else if (n <= q) {
      j = r;
      k = -d - r;
    } else if (n <= q + 2 * r) {
      j = r - d;
      k = -r;
    } else {
      j = -r;
      k = d - 3 * r;
    }
    j += m;
    k += m;

    let s = 0;
    for (let c = 0; c < 8; c++) {
      const v = [j + T[c][0], k + T[c][1]];
      s += A[v[0]][v[1]];
    }

    A[j][k] = s;

    if (s >= input) {
      return s;
    }
  }

  return 0;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day03\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
