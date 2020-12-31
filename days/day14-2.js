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
