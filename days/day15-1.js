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
