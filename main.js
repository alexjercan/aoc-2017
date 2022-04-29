import day01 from './src/day01.js';
import day02 from './src/day02.js';
import day03 from './src/day03.js';
import day04 from './src/day04.js';
import day05 from './src/day05.js';
import day06 from './src/day06.js';
import day07 from './src/day07.js';
import day08 from './src/day08.js';
import day09 from './src/day09.js';
import day10 from './src/day10.js';
import day11 from './src/day11.js';
import day12 from './src/day12.js';
import day13 from './src/day13.js';
import day14 from './src/day14.js';
import day15 from './src/day15.js';
import day16 from './src/day16.js';
import day17 from './src/day17.js';
import day18 from './src/day18.js';
import day19 from './src/day19.js';
import day20 from './src/day20.js';
import day21 from './src/day21.js';
import day22 from './src/day22.js';
import day23 from './src/day23.js';
import day24 from './src/day24.js';
import day25 from './src/day25.js';
import * as fs from 'fs';

function solve(day) {
    const input = fs.readFileSync(`./input/day${day.toString().padStart(2, '0')}.input`, 'utf8');
    switch (day) {
        case 1:
            return day01(input);
        case 2:
            return day02(input);
        case 3:
            return day03(input);
        case 4:
            return day04(input);
        case 5:
            return day05(input);
        case 6:
            return day06(input);
        case 7:
            return day07(input);
        case 8:
            return day08(input);
        case 9:
            return day09(input);
        case 10:
            return day10(input);
        case 11:
            return day11(input);
        case 12:
            return day12(input);
        case 13:
            return day13(input);
        case 14:
            return day14(input);
        case 15:
            return day15(input);
        case 16:
            return day16(input);
        case 17:
            return day17(input);
        case 18:
            return day18(input);
        case 19:
            return day19(input);
        case 20:
            return day20(input);
        case 21:
            return day21(input);
        case 22:
            return day22(input);
        case 23:
            return day23(input);
        case 24:
            return day24(input);
        case 25:
            return day25(input);
        default:
            return 'day not found';
    }
}

const day = parseInt(process.argv[2]);
console.log(solve(day));