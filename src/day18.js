function prepareInput(input) {
  var commands = [];
  input.split("\n").forEach((d) => {
    commands.push({ name: d.substring(0, 3), args: d.substring(4).split(" ") });
  });

  return commands;
}

class Program {
  constructor(id, commands) {
    this.registers = {};
    this.lastSound = "";
    this.index = 0;
    this.id = id;
    this.sendCount = 0;
    this.queue = [];
    this.registers["p"] = id;
    this.sendProgram = null;

    this.instP1 = {
      set: (a, b) => {
        this.registers[a] = this.parse(b);
        this.index++;
      },
      mul: (a, b) => {
        this.registers[a] *= this.parse(b);
        this.index++;
      },
      add: (a, b) => {
        this.registers[a] += this.parse(b);
        this.index++;
      },
      mod: (a, b) => {
        this.registers[a] = this.registers[a] % this.parse(b);
        this.index++;
      },
      snd: (a) => {
        this.lastSound = this.parse(a);
        this.index++;
      },
      jgz: (a, b) => {
        this.index += this.parse(a) > 0 ? this.parse(b) : 1;
      },
      rcv: (a) => {
        if (this.parse(a) > 0) {
          return this.lastSound;
        }
        this.index++;
      },
    };
    this.instP2 = {
      set: this.instP1.set,
      mul: this.instP1.mul,
      add: this.instP1.add,
      mod: this.instP1.mod,
      jgz: this.instP1.jgz,
      snd: (a) => {
        this.sendProgram.queue.push(this.parse(a));
        this.index++;
        this.sendCount++;
      },
      rcv: (a) => {
        if (this.queue.length > 0) {
          this.registers[a] = this.queue.shift();
          this.index++;
        }
      },
    };
    Program.prototype.executeP1 = function () {
      return this.instP1[commands[this.index].name](
        ...commands[this.index].args
      );
    };
    Program.prototype.executeP2 = function () {
      return this.instP2[commands[this.index].name](
        ...commands[this.index].args
      );
    };
    Program.prototype.parse = function (b) {
      return isNaN(b) ? this.registers[b] : parseInt(b);
    };
    Program.prototype.finished = function () {
      return this.index < 0 || this.index >= commands.length;
    };
    Program.prototype.finishedOrStalled = function () {
      return (
        this.finished() ||
        (commands[this.index].name == "rcv" && this.queue.length == 0)
      );
    };
  }
}

function part1(instructions) {
  var prog = new Program(0, instructions);
  let result = 0;
  while (true) {
    result = prog.executeP1();
    if (result !== undefined) {
      return result;
    }
  }
}

function part2(instructions) {
  var programs = [new Program(0, instructions), new Program(1, instructions)];
  programs[0].sendProgram = programs[1];
  programs[1].sendProgram = programs[0];
  do {
    programs.forEach((d) => {
      if (!d.finished()) d.executeP2();
    });
  } while (!programs.reduce((a, b) => a && b.finishedOrStalled(), true));

  return programs[1].sendCount;
}

export default function solve(input) {
  input = prepareInput(input);
  return "Day18\nPart1: " + part1(input) + "\nPart2: " + part2(input) + "\n";
}
