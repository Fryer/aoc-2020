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
