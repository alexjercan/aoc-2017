function prepareInput(input) {
  return input.trim().split(",");
}

function spin(array, offset) {
    return array.slice(array.length - offset).concat(array.slice(0, array.length - offset));
}

function exchange(array, a, b) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;

    return array;
}

function partner(array, a, b) {
    return exchange(array, array.indexOf(a), array.indexOf(b));
}

function dance(programs, input) {
    for (const move of input) {
        switch (move[0]) {
            case "s":
                programs = spin(programs, parseInt(move.slice(1)));
                break;
            case "x":
                const [i, j] = move.slice(1).split("/").map(x => parseInt(x));
                programs = exchange(programs, i, j);
                break;
            case "p":
                const [a, b] = move.slice(1).split("/");
                programs = partner(programs, a, b);
                break;
        }
    }

    return programs;
}

function part1(input) {
    const programs = "abcdefghijklmnop".split("");
    return dance(programs, input).join("");
}

function part2(input) {
    let programs = "abcdefghijklmnop".split("");
    const seen = new Map();

    let indexStart = 0;
    let indexEnd = 0;
    for (let i = 0; i < 1_000_000_000; i++) {
        programs = dance(programs, input);
        const key = programs.join("");
        if (seen.has(key)) {
            indexStart = seen.get(key);
            indexEnd = i;
            break;
        }

        seen.set(key, i);
    }

    const intervalSize = indexEnd - indexStart;
    const iterations = (1_000_000_000 - indexStart) % intervalSize - 1;

    for (let i = 0; i < iterations; i++) {
        programs = dance(programs, input);
    }

    return programs.join("");
}

export default function solve(input) {
    input = prepareInput(input);
    return "Day16\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}