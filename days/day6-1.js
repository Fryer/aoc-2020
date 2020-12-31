let groups = data.split('\n\n').map(group => group.split('\n'));
let counts = groups.reduce((counts, group) => {
    let countSet = new Set();
    group.forEach(answers => answers.split('').forEach(answer => countSet.add(answer)));
    return counts + countSet.size;
}, 0);
log('Sum of answer counts (part 1): ' + counts);
