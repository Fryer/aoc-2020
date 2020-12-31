let schedule = data.split('\n')[1].split(',').map(interval => interval == 'x' ? 1 : interval * 1);
let time = schedule[0];
let step = 1;
schedule.forEach((interval, i) => {
    while ((time + i) % interval != 0) {
        time += step;
    }
    step *= interval;
});
log('Earliest alignment time (part 2): ' + time);
