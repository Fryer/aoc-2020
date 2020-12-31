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
