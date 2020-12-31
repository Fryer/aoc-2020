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
queue = [numbers[0]];
let sum = numbers[0];
numbers.slice(1).forEach(number => {
    if (sum < firstInvalid) {
        queue.push(number);
        sum += number;
    }
    while (sum > firstInvalid) {
        sum -= queue.shift();
    }
});
let maxNum = queue.reduce((maxNum, num) => Math.max(maxNum, num), 0);
let minNum = queue.reduce((minNum, num) => Math.min(minNum, num), maxNum);
let weakness = minNum + maxNum;
log('Encryption weakness (part 2): ' + weakness);
