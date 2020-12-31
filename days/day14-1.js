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
