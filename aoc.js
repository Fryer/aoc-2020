import * as Editor from './editor.js';


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


days[16] = {
    // Part 1:
    1: function(data) {
        let [rules, mine, tickets] = data.split('\n\n');
        rules = rules.split('\n').map(rule => rule.split(': ')[1].split(' or ').map(range => range.split('-')).map(range => ({ low: +range[0], high: +range[1] })));
        mine = mine.split(':\n')[1].split(',').map(num => +num);
        tickets = tickets.split(':\n')[1].split('\n').map(ticket => ticket.split(',').map(num => +num));
        let validNums = new Set(rules.flat().flatMap(range => [...Array(range.high - range.low + 1).keys()].map(num => num + range.low)));
        let errorRate = tickets.flat().reduce((errorRate, num) => errorRate + (validNums.has(num) ? 0 : num), 0);
        log('Error rate (part 1): ' + errorRate);
    },
    
    // Part 2:
    2: function(data) {
        let [rules, mine, tickets] = data.split('\n\n');
        let ruleIsDeparture = rules.split('\n').map(rule => rule.split(' ')[0] == 'departure');
        rules = rules.split('\n').map(rule => rule.split(': ')[1].split(' or ').map(range => range.split('-')).map(range => ({ low: +range[0], high: +range[1] })));
        mine = mine.split(':\n')[1].split(',').map(num => +num);
        tickets = tickets.split(':\n')[1].split('\n').map(ticket => ticket.split(',').map(num => +num));
        let validNums = new Set(rules.flat().flatMap(range => [...Array(range.high - range.low + 1).keys()].map(num => num + range.low)));
        tickets = tickets.flatMap(ticket => ticket.reduce((valid, num) => valid && validNums.has(num), true) ? [ticket] : []);
        let fieldRules = tickets[0].map(() => new Set([...Array(rules.length).keys()]));
        for (let ticket of tickets) {
            for (let [j, num] of ticket.entries()) {
                for (let [k, rule] of rules.entries()) {
                    let match = rule.reduce((match, range) => match || (num >= range.low && num <= range.high), false);
                    if (!match) {
                        fieldRules[j].delete(k);
                    }
                }
            }
        }
        let fieldRuleIdxs = [];
        let finished = 0;
        while (finished < fieldRules.length) {
            for (let [i, iRuleIdxs] of fieldRules.entries()) {
                if (iRuleIdxs.size == 1 && fieldRuleIdxs[i] === undefined) {
                    fieldRuleIdxs[i] = iRuleIdxs.values().next().value;
                    for (let [j, jRuleIdxs] of fieldRules.entries()) {
                        if (j != i) {
                            jRuleIdxs.delete(fieldRuleIdxs[i]);
                        }
                    }
                    finished++;
                }
            }
        }
        let multiplied = ruleIsDeparture.reduce((multiplied, isDeparture, i) => multiplied * (isDeparture ? mine[fieldRuleIdxs.indexOf(i)] : 1), 1);
        log('Multiplied departures (part 2): ' + multiplied);
    }
};


days[17] = {
    // Part 1:
    1: function(data) {
        let lines = data.split('\n');
        let cubes = {};
        let offsets = [];
        for (let i = 0; i < 27; i++) {
            if (i != 13) {
                offsets.push([i % 3 - 1, Math.floor(i / 3) % 3 - 1, Math.floor(i / 9) % 3 - 1]);
            }
        }
        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines.length; x++) {
                if (lines[y][x] == '#') {
                    cubes[[x, y, 0]] = true;
                    for (let o of offsets) {
                        let p = [x + o[0], y + o[1], o[2]];
                        if (!cubes.hasOwnProperty(p)) {
                            cubes[p] = false;
                        }
                    }
                }
            }
        }
        for (let t = 0; t < 6; t++) {
            let newCubes = {};
            for (let [p, cube] of Object.entries(cubes)) {
                p = p.split(',').map(p => +p);
                let near = 0;
                for (let o of offsets) {
                    let op = [p[0] + o[0], p[1] + o[1], p[2] + o[2]];
                    if (cubes.hasOwnProperty(op) && cubes[op]) {
                        near++;
                    }
                }
                newCubes[p] = cube ? (near == 2 || near == 3) : near == 3;
                if (newCubes[p]) {
                    for (let o of offsets) {
                        let op = [p[0] + o[0], p[1] + o[1], p[2] + o[2]];
                        if (!newCubes.hasOwnProperty(op)) {
                            newCubes[op] = false;
                        }
                    }
                }
            }
            cubes = newCubes;
        }
        let activeCubes = Object.values(cubes).reduce((activeCubes, cube) => activeCubes + cube, 0);
        log('Active cubes (part 1): ' + activeCubes);
    },
    
    // Part 2:
    2: function(data) {
        let lines = data.split('\n');
        let cubes = {};
        let offsets = [];
        for (let i = 0; i < 81; i++) {
            if (i % 3 - 1 != 0 || Math.floor(i / 3) % 3 - 1 != 0 || Math.floor(i / 9) % 3 - 1 != 0 || Math.floor(i / 27) % 3 - 1 != 0) {
                offsets.push([i % 3 - 1, Math.floor(i / 3) % 3 - 1, Math.floor(i / 9) % 3 - 1, Math.floor(i / 27) % 3 - 1]);
            }
        }
        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines.length; x++) {
                if (lines[y][x] == '#') {
                    cubes[[x, y, 0, 0]] = true;
                    for (let o of offsets) {
                        let p = [x + o[0], y + o[1], o[2], o[3]];
                        if (!cubes.hasOwnProperty(p)) {
                            cubes[p] = false;
                        }
                    }
                }
            }
        }
        for (let t = 0; t < 6; t++) {
            let newCubes = {};
            for (let [p, cube] of Object.entries(cubes)) {
                p = p.split(',').map(p => +p);
                let near = 0;
                for (let o of offsets) {
                    let op = [p[0] + o[0], p[1] + o[1], p[2] + o[2], p[3] + o[3]];
                    if (cubes.hasOwnProperty(op) && cubes[op]) {
                        near++;
                    }
                }
                newCubes[p] = cube ? (near == 2 || near == 3) : near == 3;
                if (newCubes[p]) {
                    for (let o of offsets) {
                        let op = [p[0] + o[0], p[1] + o[1], p[2] + o[2], p[3] + o[3]];
                        if (!newCubes.hasOwnProperty(op)) {
                            newCubes[op] = false;
                        }
                    }
                }
            }
            cubes = newCubes;
        }
        let activeCubes = Object.values(cubes).reduce((activeCubes, cube) => activeCubes + cube, 0);
        log('Active hypercubes (part 1): ' + activeCubes);
    }
};


days[18] = {
    // Part 1:
    1: function(data) {
        let exprs = data.split('\n').map(expr => expr.replaceAll(' ', ''));
        function compute(expr) {
            let stack = [];
            let answer = 0;
            let op = '+';
            for (let i = 0; i < expr.length; i++) {
                if (expr[i] == '(') {
                    stack.push([answer, op]);
                    answer = 0;
                    op = '+';
                }
                else if (expr[i] == ')') {
                    let [stackAnswer, stackOp] = stack.pop();
                    answer = stackOp == '+' ? stackAnswer + answer : stackAnswer * answer;
                }
                else if (expr[i] == '+' || expr[i] == '*') {
                    op = expr[i];
                }
                else {
                    answer = op == '+' ? answer + (+expr[i]) : answer * expr[i];
                }
            }
            return answer;
        }
        let sum = exprs.reduce((sum, expr) => sum + compute(expr), 0);
        log('Sum of expressions (part 1): ' + sum);
    },
    
    // Part 2:
    2: function(data) {
        let exprs = data.split('\n').map(expr => expr.replaceAll(' ', ''));
        function compute(expr) {
            let stack = [];
            let answer = 0;
            let op = '+';
            let level = 0;
            function push() {
                stack.push([answer, op, level]);
                answer = 0;
                op = '+';
                level = 0;
            }
            function pop(nextOp) {
                let part = answer;
                [answer, op, level] = stack.pop();
                computePart(part, nextOp);
            }
            function computePart(part, nextOp) {
                if (nextOp == '+' && level == 0) {
                    push();
                    answer = part;
                    level = 1;
                    return;
                }
                answer = op == '+' ? answer + part : answer * part;
                if (nextOp == '*' && level == 1) {
                    pop(nextOp);
                }
            }
            for (let i = 0; i < expr.length; i++) {
                let nextOp = i + 1 < expr.length ? expr[i + 1] : '';
                if (expr[i] == '(') {
                    push();
                }
                else if (expr[i] == ')') {
                    if (level == 1) {
                        pop('');
                    }
                    pop(nextOp);
                }
                else if (expr[i] == '+' || expr[i] == '*') {
                    op = expr[i];
                }
                else {
                    computePart(+expr[i], nextOp);
                }
            }
            if (level == 1) {
                pop('');
            }
            return answer;
        }
        let sum = exprs.reduce((sum, expr) => sum + compute(expr), 0);
        log('Sum of expressions (part 2): ' + sum);
    }
};


days[19] = {
    // Part 1:
    1: function(data) {
        let [rules, msgs] = data.split('\n\n');
        rules = Object.fromEntries(rules.split('\n').map(rule => rule.split(': ')));
        function expand(rule) {
            if (rule[0] == '"') {
                return rule[1];
            }
            return '(' + rule.split(' ').reduce((rule, part) => rule + (part == '|' ? '|' : expand(rules[part])), '') + ')';
        }
        let rule = new RegExp('^' + expand(rules[0]) + '$', 'gm');
        let matches = msgs.match(rule).length;
        log('Messages lines (part 1): ' + matches);
    },
    
    // Part 2:
    2: function(data) {
        let [rules, msgs] = data.split('\n\n');
        rules = rules.replace('8: 42', '8: 42 | 42 8');
        rules = rules.replace('11: 42 31', '11: 42 31 | 42 11 31');
        rules = Object.fromEntries(rules.split('\n').map(rule => rule.split(': ')));
        let n8 = 0;
        let n11 = 0;
        function expand(i, rule, n8, n11) {
            if (i == 8 && n8 == 5) {
                return '(' + expand(42, rules[42], n8, n11) + ')';
            }
            if (i == 11 && n11 == 5) {
                return '(' + expand(42, rules[42], n8, n11) + expand(31, rules[31], n8, n11) + ')';
            }
            n8 += i == 8;
            n11 += i == 11;
            if (rule[0] == '"') {
                return rule[1];
            }
            return '(' + rule.split(' ').reduce((rule, part) => rule + (part == '|' ? '|' : expand(part, rules[part], n8, n11)), '') + ')';
        }
        let rule = new RegExp('^' + expand(0, rules[0], 0, 0) + '$', 'gm');
        let matches = msgs.match(rule).length;
        log('Messages lines (part 2): ' + matches);
    }
};


days[20] = {
    // Part 1:
    1: function(data) {
        let tiles = Object.fromEntries(data.split('\n\n').map(tile => tile.split(':\n')).map(tile => [tile[0].split(' ')[1], tile[1]]));
        let tilesAtBorders = {};
        let tileBorders = {};
        for (let [id, tile] of Object.entries(tiles)) {
            let top = tile.split('\n')[0];
            let topFlip = top.split('').slice().reverse().join('');
            let bottom = tile.split('\n').pop();
            let bottomFlip = bottom.split('').slice().reverse().join('');
            let left = tile.split('\n').map(p => p[0]).join('');
            let leftFlip = left.split('').slice().reverse().join('');
            let right = tile.split('\n').map(p => p.split('').pop()).join('');
            let rightFlip = right.split('').slice().reverse().join('');
            tileBorders[id] = [top, topFlip, bottom, bottomFlip, left, leftFlip, right, rightFlip];
            tileBorders[id].forEach(border => {
                if (!tilesAtBorders.hasOwnProperty(border)) {
                    tilesAtBorders[border] = [];
                }
                tilesAtBorders[border].push(id);
            });
        }
        let multiplied = 1;
        for (let [id, borders] of Object.entries(tileBorders)) {
            let tileNeighbors = new Set();
            for (let border of borders) {
                tilesAtBorders[border].forEach(nId => tileNeighbors.add(nId));
            }
            tileNeighbors.delete(id);
            if (tileNeighbors.size == 2) {
                multiplied *= id;
            }
        }
        log('Multiplied corners (part 1): ' + multiplied);
    },
    
    // Part 2:
    2: function(data) {
        let tiles = Object.fromEntries(data.split('\n\n').map(tile => tile.split(':\n')).map(tile => [tile[0].split(' ')[1], tile[1]]));
        function getBorders(tile) {
            let top = tile.split('\n')[0];
            let bottom = tile.split('\n').pop();
            let left = tile.split('\n').map(row => row[0]).join('');
            let right = tile.split('\n').map(row => row.split('').pop()).join('');
            return [top, bottom, left, right];
        }
        let borderIdxs = {};
        let borderPositions = {};
        let firstId = Object.keys(tiles)[0];
        getBorders(tiles[firstId]).forEach((border, i) => {
            borderIdxs[border] = i;
            borderPositions[border] = [0, 0];
        });
        function rotate(tile) {
            let flatTile = tile.replaceAll('\n', '');
            let rotated = '';
            for (let i = 0; i < 100; i++) {
                rotated += flatTile[9 + i * 10 % 100 - Math.floor(i / 10)];
                if (i % 10 == 9) {
                    rotated += '\n';
                }
            }
            return rotated.trim();
        }
        function getPlacement(borders) {
            for (let [i, border] of borders.entries()) {
                if (!borderIdxs.hasOwnProperty(border)) {
                    continue;
                }
                let j = borderIdxs[border];
                if ((i == 0 && j == 1) || (i == 1 && j == 0) || (i == 2 && j == 3) || (i == 3 && j == 2)) {
                    return [borderPositions[border][0] - (i == 3) + (i == 2), borderPositions[border][1] - (i == 1) + (i == 0)];
                }
            }
            return false;
        }
        let tilePositions = Object.fromEntries([[firstId, [0, 0]]]);
        let topLeft = [0, 0];
        let tilesLeft = new Set(Object.keys(tiles));
        tilesLeft.delete(firstId);
        while (tilesLeft.size > 0) {
            let placedId;
            let placedTile;
            let borders;
            let position;
            for (let id of tilesLeft.values()) {
                placedId = id;
                placedTile = tiles[id];
                borders = getBorders(placedTile);
                if (position = getPlacement(borders)) break;
                placedTile = rotate(placedTile);
                borders = getBorders(placedTile);
                if (position = getPlacement(borders)) break;
                placedTile = rotate(placedTile);
                borders = getBorders(placedTile);
                if (position = getPlacement(borders)) break;
                placedTile = rotate(placedTile);
                borders = getBorders(placedTile);
                if (position = getPlacement(borders)) break;
                placedTile = placedTile.split('\n').map(row => row.split('').reverse().join('')).join('\n');
                borders = getBorders(placedTile);
                if (position = getPlacement(borders)) break;
                placedTile = rotate(placedTile);
                borders = getBorders(placedTile);
                if (position = getPlacement(borders)) break;
                placedTile = rotate(placedTile);
                borders = getBorders(placedTile);
                if (position = getPlacement(borders)) break;
                placedTile = rotate(placedTile);
                borders = getBorders(placedTile);
                if (position = getPlacement(borders)) break;
            }
            tiles[placedId] = placedTile;
            tilePositions[placedId] = position;
            topLeft = [Math.min(topLeft[0], position[0]), Math.min(topLeft[1], position[1])];
            borders.forEach((border, i) => {
                borderIdxs[border] = i;
                borderPositions[border] = position;
            });
            tilesLeft.delete(placedId);
        }
        let mapSize = Math.sqrt(Object.keys(tiles).length) * 8;
        let pitch = mapSize + 1;
        let map = ('?'.repeat(mapSize) + '\n').repeat(mapSize).split('');
        for (let [id, position] of Object.entries(tilePositions)) {
            let tile = tiles[id];
            let mapI = (position[0] - topLeft[0]) * 8 + (position[1] - topLeft[1]) * 8 * pitch;
            for (let i = 0; i < 64; i++) {
                map[mapI + i % 8 + Math.floor(i / 8) * pitch] = tile[12 + i % 8 + Math.floor(i / 8) * 11];
            }
        }
        map = map.join('');
        let monsterDef = new RegExp('..................#.(.|\n){' + (pitch - 20) + '}#....##....##....###(.|\n){' + (pitch - 20) + '}.#..#..#..#..#..#...', 'g');
        let monster = map.search(monsterDef);
        for (let i = 0; i < 7 && monster == -1; i++) {
            if (i == 3) {
                map = map.split('\n').map(row => row.split('').reverse().join('')).join('\n');
            }
            else {
                let flatMap = map.replaceAll('\n', '');
                map = '';
                for (let j = 0; j < mapSize * mapSize; j++) {
                    map += flatMap[mapSize - 1 + j * mapSize % (mapSize * mapSize) - Math.floor(j / mapSize)];
                    if (j % mapSize == mapSize - 1) {
                        map += '\n';
                    }
                }
            }
            monster = map.search(monsterDef);
        }
        let monsters = 0;
        let start = monster + 1;
        while (monster != -1) {
            monsters++;
            if (monsters > 25) {
                break;
            }
            monster = map.slice(start).search(monsterDef);
            start += monster + 1;
        }
        let roughness = map.match(/#/g).length - monsters * 15;
        log('Water roughness (part 2): ' + roughness);
    }
};


days[21] = {
    // Part 1:
    1: function(data) {
        let foods = data.split('\n').map(food => food.split(' (contains ')).map(food => ({ ingredients: new Set(food[0].split(' ')), allergens: new Set(food[1].slice(0, -1).split(', ')) }));
        let ingredients = new Set();
        let allergens = {};
        for (let food of foods) {
            for (let ingredient of food.ingredients) {
                ingredients.add(ingredient);
            }
        }
        for (let food of foods) {
            for (let allergen of food.allergens) {
                allergens[allergen] = new Set(ingredients);
            }
        }
        for (let [allergen, ingredients] of Object.entries(allergens)) {
            for (let food of foods) {
                if (!food.allergens.has(allergen)) {
                    continue;
                }
                for (let ingredient of new Set(ingredients)) {
                    if (!food.ingredients.has(ingredient)) {
                        ingredients.delete(ingredient);
                    }
                }
            }
        }
        let safeIngredients = new Set(ingredients);
        for (let ingredients of Object.values(allergens)) {
            for (let ingredient of ingredients) {
                safeIngredients.delete(ingredient);
            }
        }
        let appearances = 0;
        for (let food of foods) {
            for (let ingredient of food.ingredients) {
                appearances +=safeIngredients.has(ingredient);
            }
        }
        log('Safe ingredient appearances (part 1): ' + appearances);
    },
    
    // Part 2:
    2: function(data) {
        let foods = data.split('\n').map(food => food.split(' (contains ')).map(food => ({ ingredients: new Set(food[0].split(' ')), allergens: new Set(food[1].slice(0, -1).split(', ')) }));
        let ingredients = new Set();
        let allergens = {};
        for (let food of foods) {
            for (let ingredient of food.ingredients) {
                ingredients.add(ingredient);
            }
        }
        for (let food of foods) {
            for (let allergen of food.allergens) {
                allergens[allergen] = new Set(ingredients);
            }
        }
        for (let [allergen, ingredients] of Object.entries(allergens)) {
            for (let food of foods) {
                if (!food.allergens.has(allergen)) {
                    continue;
                }
                for (let ingredient of new Set(ingredients)) {
                    if (!food.ingredients.has(ingredient)) {
                        ingredients.delete(ingredient);
                    }
                }
            }
        }
        let list = [];
        let allergensLeft = new Set(Object.keys(allergens));
        while (list.length < Object.keys(allergens).length) {
            let delAllergen;
            let delIngredient;
            for (let allergen of allergensLeft) {
                if (allergens[allergen].size == 1) {
                    delAllergen = allergen;
                    delIngredient = [...allergens[allergen]][0];
                    list.push({ ingredient: delIngredient, allergen: allergen });
                    break;
                }
            }
            allergensLeft.delete(delAllergen);
            for (let [allergen, ingredients] of Object.entries(allergens)) {
                if (allergen != delAllergen) {
                    ingredients.delete(delIngredient);
                }
            }
        }
        list.sort((a, b) => a.allergen > b.allergen);
        list = list.map(item => item.ingredient).join(',');
        log('Canonical dangerous ingredient list (part 2): ' + list);
    }
};


days[22] = {
    // Part 1:
    1: function(data) {
        let players = data.split('\n\n').map(player => player.split(':\n')[1]).map(player => player.split('\n').map(card => +card));
        while (players[0].length > 0 && players[1].length > 0) {
            let topA = players[0].shift();
            let topB = players[1].shift();
            if (topA > topB) {
                players[0].push(topA, topB);
            }
            else {
                players[1].push(topB, topA);
            }
        }
        let winner = players[0].length ? players[0] : players[1];
        let score = winner.reverse().reduce((score, card, i) => score += card * (i + 1), 0);
        log('Winning score (part 1): ' + score);
    },
    
    // Part 2:
    2: function(data) {
        let players = data.split('\n\n').map(player => player.split(':\n')[1]).map(player => player.split('\n').map(card => +card));
        function play(players) {
            let previous = new Set();
            while (players[0].length > 0 && players[1].length > 0) {
                if (previous.has(players[0] + ' ' + players[1])) {
                    return 0;
                }
                previous.add(players[0] + ' ' + players[1]);
                let topA = players[0].shift();
                let topB = players[1].shift();
                let winner = topA > topB ? 0 : 1;
                if (players[0].length >= topA && players[1].length >= topB) {
                    winner = play([players[0].slice(0, topA), players[1].slice(0, topB)]);
                }
                if (winner == 0) {
                    players[0].push(topA, topB);
                }
                else {
                    players[1].push(topB, topA);
                }
            }
            return players[0].length ? 0 : 1;
        }
        let winner = play(players, 1);
        let score = players[winner].reverse().reduce((score, card, i) => score += card * (i + 1), 0);
        log('Winning score (part 2): ' + score);
    }
};


days[23] = {
    // Part 1:
    1: function(data) {
        let cups = data.split('').map(cup => +cup);
        let top = cups.length;
        cups.unshift(cups.pop());
        for (let i = 0; i < 100; i++) {
            cups.push(cups.shift());
            let removed = [cups[1], cups[2], cups[3]];
            cups = [cups[0]].concat(cups.slice(4));
            let destination = cups[0] - 1 < 1 ? top : cups[0] - 1;
            let n = 0;
            while (cups.indexOf(destination) < 0) {
                if (n > 10) return;
                n++;
                destination = destination == 1 ? top : destination - 1;
            }
            let index = cups.indexOf(destination) + 1;
            cups = cups.slice(0, index).concat(removed, cups.slice(index));
        }
        let index = cups.indexOf(1);
        let order = cups.slice(index + 1).concat(cups.slice(0, index)).join('');
        log('Cup order (part 1): ' + order);
    },
    
    // Part 2:
    2: function(data) {
        let input = data.split('').map(cup => cup - 1);
        let next = new Int32Array(1000000);
        let prev = new Int32Array(1000000);
        for (let i = 0; i < 1000000; i++) {
            next[i] = i + 1;
            prev[i] = i - 1;
        }
        next[999999] = 0;
        prev[0] = 999999;
        let current = 999999;
        for (let cup of input) {
            next[prev[cup]] = next[cup];
            prev[next[cup]] = prev[cup];
            next[cup] = next[current];
            prev[cup] = current;
            prev[next[current]] = cup;
            next[current] = cup;
            current = cup;
        }
        current = 999999;
        for (let i = 0; i < 10000000; i++) {
            current = next[current];
            let a = next[current];
            let b = next[a];
            let c = next[b];
            next[current] = next[c];
            prev[next[c]] = current;
            let destination = current - 1 < 0 ? 999999 : current - 1;
            while (destination == a || destination == b || destination == c) {
                destination = destination == 0 ? 999999 : destination - 1;
            }
            next[c] = next[destination];
            prev[a] = destination;
            prev[next[destination]] = c;
            next[destination] = a;
        }
        let multiplied = (next[0] + 1) * (next[next[0]] + 1);
        log('Multiplied cups (part 2): ' + multiplied);
    }
};


async function run() {
    let hash = location.hash.slice(1).split('-');
    let selected = hash[0] == 'editor' || (hash[0] > 0 && hash[0] < days.length) ? hash[0] : days.length - 1;
    let selectedExtra = decodeURI(hash[1]);
    
    // Remove visalization.
    let canvas = document.getElementById('visualization');
    if (canvas) {
        document.body.removeChild(canvas);
    }
    
    // Clear output.
    document.getElementById('output').textContent = '';
    
    // Close editor.
    Editor.close();
    
    // Add day links.
    let nav = document.getElementById('days');
    nav.innerHTML = '';
    for (let day = 1; day <= 25; day++) {
        nav.innerHTML += ' ';
        let link;
        if (day < days.length) {
            link = document.createElement('a');
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
    
    // Add editor link.
    nav.innerHTML += '&nbsp;&nbsp;';
    let link = document.createElement('a');
    link.href = '#editor';
    if (selected == 'editor') {
        link.className = 'selected';
    }
    link.textContent = '+';
    nav.appendChild(link);
    
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
    
    // Open editor.
    if (selected == 'editor') {
        Editor.open();
    }
}


run();
addEventListener('hashchange', run);
