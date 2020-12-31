let lines = data.split('\n');
let time = lines[0];
let schedule = lines[1].split(',').flatMap(interval => interval == 'x' ? [] : [interval]);
let offsets = schedule.map(interval => interval - time % interval);
let id = offsets.reduce((id, offset, i) => offset < offsets[id] ? i : id, 0);
let multiplied = schedule[id] * offsets[id];
log('Multiplied ID and wait (part 1): ' + multiplied);
