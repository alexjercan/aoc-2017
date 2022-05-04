function prepareInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) =>
      line.split(", ").map((data) =>
        data
          .substring(data.indexOf("<") + 1, data.lastIndexOf(">"))
          .split(",")
          .map((val) => parseInt(val))
      )
    );
}

function part1(input) {
  const [minimumIndex] = input
    .map((line, index) => [
      index,
      line.map((data) => data.reduce((acc, val) => acc + Math.abs(val), 0)),
    ])
    .sort(([, xs], [, ys]) => {
      for (let i = xs.length - 1; i >= 0; i--) {
        if (xs[i] !== ys[i]) {
          return xs[i] - ys[i];
        }
      }

      return 0;
    });

  return minimumIndex[0];
}

function stepParticle(particle) {
  particle.velocity = particle.velocity.map(
    (val, index) => val + particle.acceleration[index]
  );

  particle.position = particle.position.map(
    (val, index) => val + particle.velocity[index]
  );

  return particle;
}

function collided(particle, index, array) {
  for (let i = 0; i < array.length; i++) {
    if (
      i !== index &&
      array[i].position.every((val, j) => val === particle.position[j])
    ) {
      return true;
    }
  }

  return false;
}

function part2(input) {
  let particles = input
    .map((line) => ({
      position: line[0],
      velocity: line[1],
      acceleration: line[2],
    }))
    .filter((particle, index, array) => !collided(particle, index, array));

  for (let i = 0; i < 1000; i++) {
    particles = particles.map(stepParticle);
    particles = particles.filter(
      (particle, index, array) => !collided(particle, index, array)
    );
  }

  return particles.length;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day20\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
