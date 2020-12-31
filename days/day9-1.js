let numbers = data.split('\n').map(number => number * 1);
let queue = numbers.slice(0, 25);
let firstInvalid = -1;
numbers.slice(25).forEach(number => {
    if (firstInvalid >= 0) {
        return;
    }
    let valid = queue.slice(0, -1).reduce((valid, iNum, i) => valid || queue.slice(i + 1).reduce((valid, jNum) => valid || iNum + jNum == number, false), false);
    queue.shift();
    queue.push(number);
    if (!valid) {
        firstInvalid = number;
    }
});
log('First invalid number (part 1): ' + firstInvalid);
