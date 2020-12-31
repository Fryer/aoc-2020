let adapters = data.split('\n').map(jolts => jolts * 1).sort((a, b) => a - b);
let distribution = [0, 0, 0, 0];
adapters.slice(1).forEach((jolts, i) => distribution[jolts - adapters[i]]++);
let multiplied = (distribution[1] + 1) * (distribution[3] + 1);
log('Multiplied distribution (part 1): ' + multiplied);
