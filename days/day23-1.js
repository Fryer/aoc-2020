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
