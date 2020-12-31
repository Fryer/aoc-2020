let passes = data.split('\n').map(pass => {
    return pass.split('').reduce((seat, part) => {
        return (seat << 1) + (part == 'B' || part == 'R');
    }, 0);
});
let highest = passes.reduce((highest, pass) => {
    return Math.max(highest, pass);
}, -1);
log('Highest seat ID (part 1): ' + highest);
