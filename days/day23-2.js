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
