let [rules, mine, tickets] = data.split('\n\n');
let ruleIsDeparture = rules.split('\n').map(rule => rule.split(' ')[0] == 'departure');
rules = rules.split('\n').map(rule => rule.split(': ')[1].split(' or ').map(range => range.split('-')).map(range => ({ low: +range[0], high: +range[1] })));
mine = mine.split(':\n')[1].split(',').map(num => +num);
tickets = tickets.split(':\n')[1].split('\n').map(ticket => ticket.split(',').map(num => +num));
let validNums = new Set(rules.flat().flatMap(range => [...Array(range.high - range.low + 1).keys()].map(num => num + range.low)));
tickets = tickets.flatMap(ticket => ticket.reduce((valid, num) => valid && validNums.has(num), true) ? [ticket] : []);
let fieldRules = tickets[0].map(() => new Set([...Array(rules.length).keys()]));
for (let ticket of tickets) {
    for (let [j, num] of ticket.entries()) {
        for (let [k, rule] of rules.entries()) {
            let match = rule.reduce((match, range) => match || (num >= range.low && num <= range.high), false);
            if (!match) {
                fieldRules[j].delete(k);
            }
        }
    }
}
let fieldRuleIdxs = [];
let finished = 0;
while (finished < fieldRules.length) {
    for (let [i, iRuleIdxs] of fieldRules.entries()) {
        if (iRuleIdxs.size == 1 && fieldRuleIdxs[i] === undefined) {
            fieldRuleIdxs[i] = iRuleIdxs.values().next().value;
            for (let [j, jRuleIdxs] of fieldRules.entries()) {
                if (j != i) {
                    jRuleIdxs.delete(fieldRuleIdxs[i]);
                }
            }
            finished++;
        }
    }
}
let multiplied = ruleIsDeparture.reduce((multiplied, isDeparture, i) => multiplied * (isDeparture ? mine[fieldRuleIdxs.indexOf(i)] : 1), 1);
log('Multiplied departures (part 2): ' + multiplied);
