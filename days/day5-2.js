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
