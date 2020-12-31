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
