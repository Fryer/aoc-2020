'use strict';


async function read(file) {
    return (await (await fetch(file)).text()).replaceAll('\r', '').trim();
}


function log(text) {
    document.querySelector('pre').textContent += text + '\n';
}


let days = [];


days[1] = function(data) {
    // Part 1:
    {
        let report = data.split('\n').map(line => line * 1);
        let multiplied = -1;
        report.slice(0, -1).forEach((iLine, i) => { report.slice(i + 1).forEach((jLine, j) => {
            if (iLine + jLine == 2020) {
                multiplied = iLine * jLine;
            }
        })});
        log('Multiplied expenses (part 1): ' + multiplied);
    }
    
    // Part 2:
    {
        let report = data.split('\n').map(line => line * 1);
        let multiplied = -1;
        report.slice(0, -2).forEach((iLine, i) => { report.slice(i + 1, -1).forEach((jLine, j) => { report.slice(j + 1).forEach((kLine, k) => {
            if (iLine + jLine + kLine == 2020) {
                multiplied = iLine * jLine * kLine;
            }
        })})});
        log('Multiplied expenses (part 2): ' + multiplied);
    }
};


days[2] = function(data) {
    // Part 1:
    {
        let passwords = data.split('\n');
        let valid = passwords.reduce((valid, password) => {
            let parts = password.split(' ');
            let range = parts[0].split('-');
            let control = parts[1][0];
            let code = parts[2];
            let n = code.split('').reduce((n, chr) => n + (chr == control), 0);
            return valid + (n >= range[0] && n <= range[1]);
        }, 0);
        log('Valid passwords (part 1): ' + valid);
    }
    
    // Part 2:
    {
        let passwords = data.split('\n');
        let valid = passwords.reduce((valid, password) => {
            let parts = password.split(' ');
            let positions = parts[0].split('-').map(p => p - 1);
            let control = parts[1][0];
            let code = parts[2];
            return valid + (code[positions[0]] == control ^ code[positions[1]] == control);
        }, 0);
        log('Valid passwords (part 2): ' + valid);
    }
};


days[3] = function(data) {
    // Part 1:
    {
        let rows = data.split('\n').map(row => row.split('').map(cell => cell == '#'));
        let trees = 0;
        for (let y = 0, x = 0; y < rows.length; y++, x = (x + 3) % rows[0].length) {
            trees += rows[y][x];
        }
        log('Trees encountered (part 1): ' + trees);
    }
    
    // Part 2:
    {
        let rows = data.split('\n').map(row => row.split('').map(cell => cell == '#'));
        let slopes = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];
        let multiplied = slopes.reduce((multiplied, slope) => {
            let trees = 0;
            for (let y = 0, x = 0; y < rows.length; y += slope[0], x = (x + slope[1]) % rows[0].length) {
                trees += rows[y][x];
            }
            return multiplied * trees;
        }, 1);
        log('Trees multiplied (part 2): ' + multiplied);
    }
};


days[4] = function(data) {
    // Part 1:
    {
        let valid = 0;
        let passports = data.split('\n\n');
        for (let passport of passports) {
            passport = passport.split(/ |\n/);
            let fieldsLeft = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
            for (let field of passport) {
                field = field.split(':');
                if (fieldsLeft.has(field[0])) {
                    fieldsLeft.delete(field[0]);
                }
            }
            if (fieldsLeft.size > 0) {
                continue;
            }
            valid++;
        }
        log('Valid passports (part 1): ' + valid);
    }
    
    // Part 2:
    {
        let validPassports = 0;
        let passports = data.split('\n\n');
        for (let passport of passports) {
            passport = passport.split(/ |\n/);
            let fieldsLeft = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
            let valid = true;
            for (let field of passport) {
                field = field.split(':');
                if (fieldsLeft.has(field[0])) {
                    fieldsLeft.delete(field[0]);
                }
                switch (field[0]) {
                    case 'byr':
                        if (!/^[0-9]{4}$/.test(field[1]) || field[1] < 1920 || field[1] > 2002) {
                            valid = false;
                        }
                        break;
                    case 'iyr':
                        if (!/^[0-9]{4}$/.test(field[1]) || field[1] < 2010 || field[1] > 2020) {
                            valid = false;
                        }
                        break;
                    case 'eyr':
                        if (!/^[0-9]{4}$/.test(field[1]) || field[1] < 2020 || field[1] > 2030) {
                            valid = false;
                        }
                        break;
                    case 'hgt':
                        if (!/^[0-9]+(cm|in)$/.test(field[1])) {
                            valid = false;
                        }
                        else if (/[0-9]+cm/.test(field[1])) {
                            let hgt = field[1].replace('cm', '');
                            if (hgt < 150 || hgt > 193) {
                                valid = false;
                            }
                        }
                        else if (/[0-9]+in/.test(field[1])) {
                            let hgt = field[1].replace('in', '');
                            if (hgt < 59 || hgt > 76) {
                                valid = false;
                            }
                        }
                        break;
                    case 'hcl':
                        if (!/^#[0-9a-f]{6}$/.test(field[1])) {
                            valid = false;
                        }
                        break;
                    case 'ecl':
                        if (!/^amb|blu|brn|gry|grn|hzl|oth$/.test(field[1])) {
                            valid = false;
                        }
                        break;
                    case 'pid':
                        if (!/^[0-9]{9}$/.test(field[1])) {
                            valid = false;
                        }
                        break;
                    default:
                        break;
                }
            }
            if (fieldsLeft.size > 0 || !valid) {
                continue;
            }
            validPassports++;
        }
        log('Valid passports (part 2): ' + validPassports);
    }
};


days[5] = function(data) {
    // Part 1:
    {
        let passes = data.split('\n').map(pass => {
            return pass.split('').reduce((seat, part) => {
                return (seat << 1) + (part == 'B' || part == 'R');
            }, 0);
        });
        let highest = passes.reduce((highest, pass) => {
            return Math.max(highest, pass);
        }, -1);
        log('Highest seat ID (part 1): ' + highest);
    }
    
    // Part 2:
    {
        let passes = data.split('\n').map(pass => {
            return pass.split('').reduce((seat, part) => {
                return (seat << 1) + (part == 'B' || part == 'R');
            }, 0);
        });
        let highest = passes.reduce((highest, pass) => {
            return Math.max(highest, pass);
        }, -1);
        let lowest = passes.reduce((lowest, pass) => {
            return Math.min(lowest, pass);
        }, highest);
        let seats = new Set();
        for (let i = lowest; i <= highest; i++) {
            seats.add(i);
        }
        passes.forEach(pass => seats.delete(pass));
        log('My seat ID (part 2): ' + seats.values().next().value);
    }
};


days[6] = function(data) {
    // Part 1:
    {
        let groups = data.split('\n\n').map(group => group.split('\n'));
        let counts = groups.reduce((counts, group) => {
            let countSet = new Set();
            group.forEach(answers => answers.split('').forEach(answer => countSet.add(answer)));
            return counts + countSet.size;
        }, 0);
        log('Sum of answer counts (part 1): ' + counts);
    }
    
    // Part 2:
    {
        let groups = data.split('\n\n').map(group => group.split('\n'));
        let counts = groups.reduce((counts, group) => {
            let countMap = {};
            group.forEach(answers => answers.split('').forEach(answer => countMap[answer] = countMap[answer] ? countMap[answer] + 1 : 1));
            return counts + Object.values(countMap).reduce((count, answerCount) => count + (answerCount == group.length), 0);
        }, 0);
        log('Sum of answer counts (part 2): ' + counts);
    }
};


days[7] = function(data) {
    // Part 1:
    {
        let rules = Object.fromEntries(data.split('\n').map(rule => rule.replace('.', '').split(' bags contain ')).map(rule => [rule[0], rule[1].split(', ').map(inner => inner.replace(/ bags?$/, '').replace(' ', ',').split(',', 2))]));
        let cache = {};
        function canContain(rule, bag) {
            if (cache.hasOwnProperty(rule[1])) {
                return cache[rule[1]];
            }
            let hasBag = false;
            if (rule[1][0][0] != 'no') {
                hasBag = rule[1].reduce((hasBag, inner) => hasBag || inner[1] == bag || canContain([inner[1], rules[inner[1]]], bag), false);
            }
            cache[rule[1]] = hasBag;
            return hasBag;
        }
        let colors = Object.entries(rules).reduce((colors, rule) => colors + canContain(rule, 'shiny gold'), 0);
        log('Possible bag colors (part 1): ' + colors);
    }
    
    // Part 2:
    {
        let rules = Object.fromEntries(data.split('\n').map(rule => rule.replace('.', '').split(' bags contain ')).map(rule => [rule[0], rule[1].split(', ').map(inner => inner.replace(/ bags?$/, '').replace(' ', ',').split(',', 2))]));
        let cache = {};
        function bagsInside(bag) {
            let rule = rules[bag];
            if (cache.hasOwnProperty(bag)) {
                return cache[bag];
            }
            let inside = 0;
            if (rule[0][0] != 'no') {
                inside = rule.reduce((inside, inner) => inside + inner[0] * (1 + bagsInside(inner[1])), 0);
            }
            cache[bag] = inside;
            return inside;
        }
        log('Bags contained (part 2): ' + bagsInside('shiny gold'));
    }
};


days[8] = function(data) {
    // Part 1:
    {
        let code = data.split('\n').map(op => op.split(' ')).map(op => ({inst: op[0], num: op[1] * 1, visited: false}));
        let pos = 0;
        let acc = 0;
        while (!code[pos].visited) {
            code[pos].visited = true;
            if (code[pos].inst == 'jmp') {
                pos += code[pos].num;
                continue;
            }
            if (code[pos].inst == 'acc') {
                acc += code[pos].num;
            }
            pos++;
        }
        log('Accumulator before looping (part 1): ' + acc);
    }
    
    // Part 2:
    {
        let code = data.split('\n').map(op => op.split(' ')).map(op => ({inst: op[0], num: op[1] * 1}));
        let acc;
        for (let changePos = 0; changePos < code.length; changePos++) {
            if (code[changePos].inst == 'acc') {
                continue;
            }
            code.forEach(op => op.visited = false);
            let pos = 0;
            acc = 0;
            while (pos < code.length && !code[pos].visited) {
                code[pos].visited = true;
                let inst = pos == changePos ? (code[pos].inst == 'jmp' ? 'nop' : 'jmp') : code[pos].inst;
                if (inst == 'jmp') {
                    pos += code[pos].num;
                    continue;
                }
                if (inst == 'acc') {
                    acc += code[pos].num;
                }
                pos++;
            }
            if (pos == code.length) {
                break;
            }
        }
        log('Accumulator at termination (part 2): ' + acc);
    }
};


days[9] = function(data) {
    // Part 1:
    {
        let numbers = data.split('\n').map(number => number * 1);
        let queue = numbers.slice(0, 25);
        let firstInvalid = -1;
        numbers.slice(25).forEach(number => {
            if (firstInvalid >= 0) {
                return;
            }
            let valid = queue.slice(0, -1).reduce((valid, iNum, i) => valid || queue.slice(i + 1).reduce((valid, jNum) => valid || iNum + jNum == number, false), false);
            queue.shift();
            queue.push(number);
            if (!valid) {
                firstInvalid = number;
            }
        });
        log('First invalid number (part 1): ' + firstInvalid);
    }
    
    // Part 2:
    {
        let numbers = data.split('\n').map(number => number * 1);
        let queue = numbers.slice(0, 25);
        let firstInvalid = -1;
        numbers.slice(25).forEach(number => {
            if (firstInvalid >= 0) {
                return;
            }
            let valid = queue.slice(0, -1).reduce((valid, iNum, i) => valid || queue.slice(i + 1).reduce((valid, jNum) => valid || iNum + jNum == number, false), false);
            queue.shift();
            queue.push(number);
            if (!valid) {
                firstInvalid = number;
            }
        });
        queue = [numbers[0]];
        let sum = numbers[0];
        numbers.slice(1).forEach(number => {
            if (sum < firstInvalid) {
                queue.push(number);
                sum += number;
            }
            while (sum > firstInvalid) {
                sum -= queue.shift();
            }
        });
        let maxNum = queue.reduce((maxNum, num) => Math.max(maxNum, num), 0);
        let minNum = queue.reduce((minNum, num) => Math.min(minNum, num), maxNum);
        let weakness = minNum + maxNum;
        log('Encryption weakness (part 2): ' + weakness);
    }
};


days[10] = function(data) {
    // Part 1:
    {
        let adapters = data.split('\n').map(jolts => jolts * 1).sort((a, b) => a - b);
        let distribution = [0, 0, 0, 0];
        adapters.slice(1).forEach((jolts, i) => distribution[jolts - adapters[i]]++);
        let multiplied = (distribution[1] + 1) * (distribution[3] + 1);
        log('Multiplied distribution (part 1): ' + multiplied);
    }
    
    // Part 2:
    {
        let chain = [0].concat(data.split('\n').map(jolts => jolts * 1).sort((a, b) => a - b));
        chain.push(chain[chain.length - 1] + 3);
        function subArrangements(chain) {
            return chain.slice(1, -1).reduce((total, jolts, i) => total + (chain[i + 1] - chain[i - 1] <= 3 ? subArrangements([chain[i - 1]].concat(chain.slice(i + 1))) : 0), 1);
        }
        function arrangements(chain) {
            let total = 1;
            let subChainStart = 0;
            for (let i = 1; i < chain.length; i++) {
                if (chain[i] - chain[i - 1] == 3) {
                    total *= subArrangements(chain.slice(subChainStart, i + 1));
                    subChainStart = i;
                }
            }
            return total;
        }
        log('Possible arrangements (part 2): ' + arrangements(chain));
    }
};


async function run() {
    document.querySelector('pre').textContent = '';
    let day = location.hash.slice(1);
    let dayRange = day > 0 && day < days.length ? [day, day] : [days.length - 1, 1];
    for (let day = dayRange[0]; day >= dayRange[1]; day--) {
        let data = (await (await fetch('day' + day + '.txt')).text()).replaceAll('\r', '').trim();
        log('Day ' + day);
        log('================================');
        days[day](data);
        log('');
    }
}


run();
addEventListener('hashchange', run);
