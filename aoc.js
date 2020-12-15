'use strict';


function log(text) {
    let output = document.getElementById('output');
    output.textContent += (output.textContent == '' ? '' : '\n') + text;
}


let days = [];


days[1] = {
    // Part 1:
    1: function(data) {
        let report = data.split('\n').map(line => line * 1);
        let multiplied = -1;
        report.slice(0, -1).forEach((iLine, i) => { report.slice(i + 1).forEach((jLine, j) => {
            if (iLine + jLine == 2020) {
                multiplied = iLine * jLine;
            }
        })});
        log('Multiplied expenses (part 1): ' + multiplied);
    },
    
    // Part 2:
    2: function(data) {
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


days[2] = {
    // Part 1:
    1: function(data) {
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
    },
    
    // Part 2:
    2: function(data) {
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


days[3] = {
    // Part 1:
    1: function(data) {
        let rows = data.split('\n').map(row => row.split('').map(cell => cell == '#'));
        let trees = 0;
        for (let y = 0, x = 0; y < rows.length; y++, x = (x + 3) % rows[0].length) {
            trees += rows[y][x];
        }
        log('Trees encountered (part 1): ' + trees);
    },
    
    // Part 2:
    2: function(data) {
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


days[4] = {
    // Part 1:
    1: function(data) {
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
    },
    
    // Part 2:
    2: function(data) {
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


days[5] = {
    // Part 1:
    1: function(data) {
        let passes = data.split('\n').map(pass => {
            return pass.split('').reduce((seat, part) => {
                return (seat << 1) + (part == 'B' || part == 'R');
            }, 0);
        });
        let highest = passes.reduce((highest, pass) => {
            return Math.max(highest, pass);
        }, -1);
        log('Highest seat ID (part 1): ' + highest);
    },
    
    // Part 2:
    2: function(data) {
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


days[6] = {
    // Part 1:
    1: function(data) {
        let groups = data.split('\n\n').map(group => group.split('\n'));
        let counts = groups.reduce((counts, group) => {
            let countSet = new Set();
            group.forEach(answers => answers.split('').forEach(answer => countSet.add(answer)));
            return counts + countSet.size;
        }, 0);
        log('Sum of answer counts (part 1): ' + counts);
    },
    
    // Part 2:
    2: function(data) {
        let groups = data.split('\n\n').map(group => group.split('\n'));
        let counts = groups.reduce((counts, group) => {
            let countMap = {};
            group.forEach(answers => answers.split('').forEach(answer => countMap[answer] = countMap[answer] ? countMap[answer] + 1 : 1));
            return counts + Object.values(countMap).reduce((count, answerCount) => count + (answerCount == group.length), 0);
        }, 0);
        log('Sum of answer counts (part 2): ' + counts);
    }
};


days[7] = {
    // Part 1:
    1: function(data) {
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
    },
    
    // Part 2:
    2: function(data) {
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


days[8] = {
    // Part 1:
    1: function(data) {
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
    },
    
    // Part 2:
    2: function(data) {
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


days[9] = {
    // Part 1:
    1: function(data) {
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
    },
    
    // Part 2:
    2: function(data) {
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


days[10] = {
    // Part 1:
    1: function(data) {
        let adapters = data.split('\n').map(jolts => jolts * 1).sort((a, b) => a - b);
        let distribution = [0, 0, 0, 0];
        adapters.slice(1).forEach((jolts, i) => distribution[jolts - adapters[i]]++);
        let multiplied = (distribution[1] + 1) * (distribution[3] + 1);
        log('Multiplied distribution (part 1): ' + multiplied);
    },
    
    // Part 2:
    2: function(data) {
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


days[11] = {
    // Part 1:
    1: function(data) {
        let rows = data.split('\n');
        let w = rows[0].length;
        let h = rows.length;
        let newSeats = data.replaceAll('\n', '');
        let seats = '';
        while (seats != newSeats) {
            seats = newSeats;
            newSeats = '';
            seats.split('').forEach((seat, i) => {
                if (seat == '.') {
                    newSeats += '.';
                    return;
                }
                let offsets = [];
                if (i % w > 0) offsets.push(-1);
                if (i % w < w - 1) offsets.push(1);
                if (i >= w) offsets.push(-w);
                if (i < h * w - w) offsets.push(w);
                if (i % w > 0 && i >= w) offsets.push(-w - 1);
                if (i % w < w - 1 && i >= w) offsets.push(-w + 1);
                if (i % w > 0) offsets.push(w - 1);
                if (i % w < w - 1) offsets.push(w + 1);
                let adjacent = offsets.reduce((adjacent, offset) => adjacent + (i + offset >= 0 && i + offset < seats.length ? seats[i + offset] == '#' : 0), 0);
                if (seat == 'L' && adjacent == 0) {
                    newSeats += '#';
                }
                else if (seat == '#' && adjacent >= 4) {
                    newSeats += 'L';
                }
                else {
                    newSeats += seat;
                }
            });
        }
        let occupied = seats.split('').reduce((occupied, seat) => occupied + (seat == '#'), 0);
        log('Occupied seats (part 1): ' + occupied);
    },
    
    // Part 2:
    2: function(data) {
        let rows = data.split('\n');
        let w = rows[0].length;
        let h = rows.length;
        let newSeats = data.replaceAll('\n', '');
        let seatOffsets = newSeats.split('').map((seat, i) => {
            function trace(x, y, dx, dy) {
                x += dx;
                y += dy;
                while (x >= 0 && y >= 0 && x < w && y < h) {
                    let i = y * w + x;
                    if (newSeats[i] != '.') {
                        return [i];
                    }
                    x += dx;
                    y += dy;
                }
                return [];
            }
            let x = i % w;
            let y = Math.floor(i / w);
            return trace(x, y, -1, -1)
                .concat(trace(x, y, 0, -1))
                .concat(trace(x, y, 1, -1))
                .concat(trace(x, y, -1, 0))
                .concat(trace(x, y, 1, 0))
                .concat(trace(x, y, -1, 1))
                .concat(trace(x, y, 0, 1))
                .concat(trace(x, y, 1, 1));
        });
        let seats = '';
        while (seats != newSeats) {
            seats = newSeats;
            newSeats = '';
            seats.split('').forEach((seat, i) => {
                if (seat == '.') {
                    newSeats += '.';
                    return;
                }
                let offsets = seatOffsets[i];
                let adjacent = offsets.reduce((adjacent, offset) => adjacent + (offset >= 0 && offset < seats.length ? seats[offset] == '#' : 0), 0);
                if (seat == 'L' && adjacent == 0) {
                    newSeats += '#';
                }
                else if (seat == '#' && adjacent >= 5) {
                    newSeats += 'L';
                }
                else {
                    newSeats += seat;
                }
            });
        }
        let occupied = seats.split('').reduce((occupied, seat) => occupied + (seat == '#'), 0);
        log('Occupied seats (part 2): ' + occupied);
    }
};


days[12] = {
    // Part 1:
    1: function(data) {
        let moves = data.split('\n').map(move => [move[0], move.slice(1) * 1]);
        let x = 0;
        let y = 0;
        let a = 0;
        moves.forEach(move => {
            switch (move[0]) {
                case 'N':
                    y += move[1];
                    break;
                case 'S':
                    y -= move[1];
                    break;
                case 'E':
                    x += move[1];
                    break;
                case 'W':
                    x -= move[1];
                    break;
                case 'L':
                    a += move[1] * Math.PI / 180;
                    break;
                case 'R':
                    a -= move[1] * Math.PI / 180;
                    break;
                case 'F':
                    x += move[1] * Math.cos(a);
                    y += move[1] * Math.sin(a);
                    break;
            }
        });
        let distance = Math.round(Math.abs(x) + Math.abs(y));
        log('Distance travelled (part 1): ' + distance);
    },
    
    // Part 1 visualization:
    'Visualize Part 1': function(data) {
        let moves = data.split('\n').map(move => [move[0], move.slice(1) * 1]);
        let canvas = document.createElement('canvas');
        canvas.id = 'visualization';
        canvas.width = 900;
        canvas.height = 700;
        document.body.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        let start = performance.now() / 1000;
        function draw() {
            if (!canvas.parentNode) {
                return;
            }
            let now = performance.now() / 1000 - start;
            ctx.fillStyle = '#028';
            ctx.fillRect(0, 0, 900, 700);
            ctx.beginPath();
            ctx.moveTo(750, 350);
            let x = 0;
            let y = 0;
            let a = 0;
            let time = 0;
            let drawing = true;
            let cx = 0;
            let cy = 0;
            let ca = 0;
            moves.forEach(move => {
                if (!drawing) {
                    return;
                }
                let dx = 0;
                let dy = 0;
                let da = 0;
                switch (move[0]) {
                    case 'N':
                        y += move[1];
                        dy = move[1];
                        break;
                    case 'S':
                        y -= move[1];
                        dy = -move[1];
                        break;
                    case 'E':
                        x += move[1];
                        dx = move[1];
                        break;
                    case 'W':
                        x -= move[1];
                        dx = -move[1];
                        break;
                    case 'L':
                        a += move[1] * Math.PI / 180;
                        da = move[1] * Math.PI / 180;
                        break;
                    case 'R':
                        a -= move[1] * Math.PI / 180;
                        da = -move[1] * Math.PI / 180;
                        break;
                    case 'F':
                        x += move[1] * Math.cos(a);
                        y += move[1] * Math.sin(a);
                        dx = move[1] * Math.cos(a);
                        dy = move[1] * Math.sin(a);
                        break;
                }
                let dt = move[1] / 720;
                let interp = 0;
                cx = x;
                cy = y;
                ca = a;
                if (time + dt > now) {
                    interp = (time + dt - now) / dt;
                    cx = x - dx * interp;
                    cy = y - dy * interp;
                    ca = a - da * interp;
                    drawing = false;
                }
                time += dt;
                ctx.lineTo(750 + cx / 2, 350 - cy / 2);
            });
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#f80';
            ctx.stroke();
            ctx.fillStyle = '#0f0';
            ctx.fillRect(745, 345, 10, 10);
            let distance = Math.round(Math.abs(cx) + Math.abs(cy));
            if (drawing) {
                ctx.fillStyle = '#f00';
                ctx.fillRect(745 + x / 2, 345 - y / 2, 10, 10);
            }
            else {
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.moveTo(750 + cx / 2 - 5 * Math.cos(ca), 350 - cy / 2 + 5 * Math.sin(ca));
                ctx.lineTo(750 + cx / 2 + 10 * Math.cos(ca), 350 - cy / 2 - 10 * Math.sin(ca));
                ctx.stroke();
                requestAnimationFrame(draw);
            }
            ctx.font = 'bold 16px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            ctx.fillText('Distance: ' + distance, 750 + cx / 2, 370 - cy / 2);
        }
        requestAnimationFrame(draw);
    },
    
    // Part 2:
    2: function(data) {
        let moves = data.split('\n').map(move => [move[0], move.slice(1) * 1]);
        let x = 0;
        let y = 0;
        let wx = 10;
        let wy = 1;
        moves.forEach(move => {
            let nwx, nwy;
            switch (move[0]) {
                case 'N':
                    wy += move[1];
                    break;
                case 'S':
                    wy -= move[1];
                    break;
                case 'E':
                    wx += move[1];
                    break;
                case 'W':
                    wx -= move[1];
                    break;
                case 'L':
                    nwx = wx * Math.cos(move[1] * Math.PI / 180) - wy * Math.sin(move[1] * Math.PI / 180);
                    nwy = wy * Math.cos(move[1] * Math.PI / 180) + wx * Math.sin(move[1] * Math.PI / 180);
                    wx = nwx;
                    wy = nwy;
                    break;
                case 'R':
                    nwx = wx * Math.cos(move[1] * Math.PI / 180) + wy * Math.sin(move[1] * Math.PI / 180);
                    nwy = wy * Math.cos(move[1] * Math.PI / 180) - wx * Math.sin(move[1] * Math.PI / 180);
                    wx = nwx;
                    wy = nwy;
                    break;
                case 'F':
                    x += wx * move[1];
                    y += wy * move[1];
                    break;
            }
        });
        let distance = Math.round(Math.abs(x) + Math.abs(y));
        log('Distance travelled (part 2): ' + distance);
    },
    
    // Part 2 visualization:
    'Visualize Part 2': function(data) {
        let moves = data.split('\n').map(move => [move[0], move.slice(1) * 1]);
        let canvas = document.createElement('canvas');
        canvas.id = 'visualization';
        canvas.width = 1000;
        canvas.height = 700;
        document.body.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        let start = performance.now() / 1000;
        function draw() {
            if (!canvas.parentNode) {
                return;
            }
            let now = performance.now() / 1000 - start;
            ctx.fillStyle = '#028';
            ctx.fillRect(0, 0, 1000, 700);
            ctx.beginPath();
            ctx.moveTo(850, 450);
            let x = 0;
            let y = 0;
            let wx = 10;
            let wy = 1;
            let time = 0;
            let drawing = true;
            let cx = 0;
            let cy = 0;
            let cwx = 0;
            let cwy = 0;
            moves.forEach(move => {
                if (!drawing) {
                    return;
                }
                let dx = 0;
                let dy = 0;
                let dwx = 0;
                let dwy = 0;
                let dwa = 0;
                let nwx, nwy;
                switch (move[0]) {
                    case 'N':
                        wy += move[1];
                        dwy = move[1];
                        break;
                    case 'S':
                        wy -= move[1];
                        dwy = -move[1];
                        break;
                    case 'E':
                        wx += move[1];
                        dwx = move[1];
                        break;
                    case 'W':
                        wx -= move[1];
                        dwx = -move[1];
                        break;
                    case 'L':
                        nwx = wx * Math.cos(move[1] * Math.PI / 180) - wy * Math.sin(move[1] * Math.PI / 180);
                        nwy = wy * Math.cos(move[1] * Math.PI / 180) + wx * Math.sin(move[1] * Math.PI / 180);
                        wx = nwx;
                        wy = nwy;
                        dwa = move[1];
                        break;
                    case 'R':
                        nwx = wx * Math.cos(move[1] * Math.PI / 180) + wy * Math.sin(move[1] * Math.PI / 180);
                        nwy = wy * Math.cos(move[1] * Math.PI / 180) - wx * Math.sin(move[1] * Math.PI / 180);
                        wx = nwx;
                        wy = nwy;
                        dwa = -move[1];
                        break;
                    case 'F':
                        x += wx * move[1];
                        y += wy * move[1];
                        dx = wx * move[1];
                        dy = wy * move[1];
                        break;
                }
                let dt = (move[0] == 'F' ? Math.sqrt(dx * dx + dy * dy) / 10 : move[1]) / 720;
                let interp = 0;
                cx = x;
                cy = y;
                cwx = x + wx * 50;
                cwy = y + wy * 50;
                if (time + dt > now) {
                    interp = (time + dt - now) / dt;
                    cx = x - dx * interp;
                    cy = y - dy * interp;
                    cwx = cx + wx * 50 * Math.cos(dwa * interp * Math.PI / 180) + wy * 50 * Math.sin(dwa * interp * Math.PI / 180) - dwx * 50 * interp;
                    cwy = cy + wy * 50 * Math.cos(dwa * interp * Math.PI / 180) - wx * 50 * Math.sin(dwa * interp * Math.PI / 180) - dwy * 50 * interp;
                    drawing = false;
                }
                time += dt;
                ctx.lineTo(850 + cx / 80, 450 - cy / 80);
            });
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#f80';
            ctx.stroke();
            ctx.fillStyle = '#0f0';
            ctx.fillRect(845, 445, 10, 10);
            let distance = Math.round(Math.abs(cx) + Math.abs(cy));
            if (drawing) {
                ctx.fillStyle = '#f00';
                ctx.fillRect(845 + x / 80, 445 - y / 80, 10, 10);
            }
            else {
                ctx.fillStyle = '#ff0';
                ctx.fillRect(844 + cwx / 80, 448 - cwy / 80, 12, 4);
                ctx.fillRect(848 + cwx / 80, 444 - cwy / 80, 4, 12);
                ctx.beginPath();
                ctx.lineWidth = 10;
                let ca = Math.atan2(cwy - cy, cwx - cx);
                ctx.moveTo(850 + cx / 80 - 5 * Math.cos(ca), 450 - cy / 80 + 5 * Math.sin(ca));
                ctx.lineTo(850 + cx / 80 + 10 * Math.cos(ca), 450 - cy / 80 - 10 * Math.sin(ca));
                ctx.stroke();
                requestAnimationFrame(draw);
            }
            ctx.font = 'bold 16px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            ctx.fillText('Distance: ' + distance, 850 + cx / 80, 470 - cy / 80);
        }
        requestAnimationFrame(draw);
    }
};


days[13] = {
    // Part 1:
    1: function(data) {
        let lines = data.split('\n');
        let time = lines[0];
        let schedule = lines[1].split(',').flatMap(interval => interval == 'x' ? [] : [interval]);
        let offsets = schedule.map(interval => interval - time % interval);
        let id = offsets.reduce((id, offset, i) => offset < offsets[id] ? i : id, 0);
        let multiplied = schedule[id] * offsets[id];
        log('Multiplied ID and wait (part 1): ' + multiplied);
    },
    
    // Part 2:
    2: function(data) {
        let schedule = data.split('\n')[1].split(',').map(interval => interval == 'x' ? 1 : interval * 1);
        let time = schedule[0];
        let step = 1;
        schedule.forEach((interval, i) => {
            while ((time + i) % interval != 0) {
                time += step;
            }
            step *= interval;
        });
        log('Earliest alignment time (part 2): ' + time);
    }
};


days[14] = {
    // Part 1:
    1: function(data) {
        let ops = data.split('\n').map(op => op.split(' = ')).map(op => [op[0].replace(']', '').split('['), op[1]]).map(op => ({ inst: op[0][0], addr: op[0][1], val: op[1] }));
        let andMask = '1'.repeat(36);
        let orMask = '0'.repeat(36);
        let memory = [];
        ops.forEach(op => {
            if (op.inst == 'mask') {
                andMask = op.val.replaceAll('X', '1');
                orMask = op.val.replaceAll('X', '0');
            }
            if (op.inst == 'mem') {
                memory[op.addr] = (+op.val).toString(2).padStart(36, '0').split('').map((bit, i) => bit & andMask[i] | orMask[i]).join('');
            }
        });
        let sum = memory.reduce((sum, val) => sum + (val ? parseInt(val, 2) : 0), 0);
        log('Memory sum (part 1): ' + sum);
    },
    
    // Part 2:
    2: function(data) {
        let ops = data.split('\n').map(op => op.split(' = ')).map(op => [op[0].replace(']', '').split('['), op[1]]).map(op => ({ inst: op[0][0], addr: op[0][1], val: op[1] }));
        let mask = '';
        let memory = {};
        ops.forEach(op => {
            if (op.inst == 'mask') {
                mask = op.val;
            }
            if (op.inst == 'mem') {
                function splitAddr(addr) {
                    if (addr.indexOf('X') >= 0) {
                        return [addr.replace('X', '0'), addr.replace('X', '1')].flatMap(addr => splitAddr(addr));
                    }
                    return [addr];
                }
                let addr = (+op.addr).toString(2).padStart(36, '0').split('').map((bit, i) => mask[i] == '0' ? bit : mask[i]).join('');
                splitAddr(addr).forEach(addr => memory[addr] = (+op.val).toString(2).padStart(36, '0'));
            }
        });
        let sum = Object.values(memory).reduce((sum, val) => sum + parseInt(val, 2), 0);
        log('Memory sum (part 2): ' + sum);
    }
};


days[15] = {
    // Part 1:
    1: function(data) {
        let numbers = data.split(',').map(num => +num);
        let time = 0;
        let times = {};
        numbers.forEach(num => {
            times[num] = time;
            time++;
        });
        let last = numbers[numbers.length - 1];
        delete times[last];
        while (time < 2020) {
            let num;
            if (times.hasOwnProperty(last)) {
                num = time - 1 - times[last];
            }
            else {
                num = 0;
            }
            times[last] = time - 1;
            last = num;
            time++;
        }
        log('2020th number (part 1): ' + last);
    },
    
    // Part 2:
    2: function(data) {
        let numbers = data.split(',').map(num => +num);
        let time = 0;
        let times = (new Int32Array(30000000)).fill(-1);
        numbers.forEach(num => {
            times[num] = time;
            time++;
        });
        let last = numbers[numbers.length - 1];
        times[last] = -1;
        while (time < 30000000) {
            let num;
            if (times[last] >= 0) {
                num = time - 1 - times[last];
            }
            else {
                num = 0;
            }
            times[last] = time - 1;
            last = num;
            time++;
        }
        log('30000000th number (part 2): ' + last);
    }
};


async function run() {
    let hash = location.hash.slice(1).split('-');
    let selected = hash[0] > 0 && hash[0] <= 25 ? hash[0] : days.length - 1;
    let selectedExtra = decodeURI(hash[1]);
    
    // Remove visalization.
    let canvas = document.getElementById('visualization');
    if (canvas) {
        document.body.removeChild(canvas);
    }
    
    // Clear output.
    document.getElementById('output').textContent = '';
    
    // Add day links.
    let nav = document.getElementById('days');
    nav.innerHTML = '';
    for (let day = 1; day <= 25; day++) {
        nav.innerHTML += ' ';
        let link;
        if (day < days.length) {
            link = document.createElement('a');
            link.id = 'day' + day;
            link.href = '#' + day;
            if (day == selected) {
                link.className = 'selected';
            }
        }
        else {
            link = document.createElement('span');
            link.className = 'unavailable';
        }
        link.textContent = day;
        nav.appendChild(link);
    }
    
    // Add extra links.
    let extras = document.getElementById('extras');
    extras.innerHTML = '';
    if (selected > 0 && selected < days.length) {
        for (let extra of Object.keys(days[selected])) {
            if (extra == 1 || extra == 2) {
                continue;
            }
            extras.innerHTML += '&nbsp;&nbsp;' + (extras.innerHTML == '' ? '' : '&nbsp;');
            let link = document.createElement('a');
            link.href = '#' + selected + '-' + extra;
            if (extra == selectedExtra) {
                link.className = 'selected';
            }
            link.textContent = extra;
            extras.appendChild(link);
        }
    }
    
    // Run selected day.
    if (selected > 0 && selected < days.length) {
        let data = (await (await fetch('day' + selected + '.txt')).text()).replaceAll('\r', '').trim();
        if (selectedExtra && days[selected].hasOwnProperty(selectedExtra)) {
            days[selected][selectedExtra](data);
        }
        else {
            days[selected][1](data);
            days[selected][2](data);
        }
    }
}


run();
addEventListener('hashchange', run);
