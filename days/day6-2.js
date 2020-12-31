let groups = data.split('\n\n').map(group => group.split('\n'));
let counts = groups.reduce((counts, group) => {
    let countMap = {};
    group.forEach(answers => answers.split('').forEach(answer => countMap[answer] = countMap[answer] ? countMap[answer] + 1 : 1));
    return counts + Object.values(countMap).reduce((count, answerCount) => count + (answerCount == group.length), 0);
}, 0);
log('Sum of answer counts (part 2): ' + counts);
