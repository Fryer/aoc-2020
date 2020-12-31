let [rules, mine, tickets] = data.split('\n\n');
rules = rules.split('\n').map(rule => rule.split(': ')[1].split(' or ').map(range => range.split('-')).map(range => ({ low: +range[0], high: +range[1] })));
mine = mine.split(':\n')[1].split(',').map(num => +num);
tickets = tickets.split(':\n')[1].split('\n').map(ticket => ticket.split(',').map(num => +num));
let validNums = new Set(rules.flat().flatMap(range => [...Array(range.high - range.low + 1).keys()].map(num => num + range.low)));
let errorRate = tickets.flat().reduce((errorRate, num) => errorRate + (validNums.has(num) ? 0 : num), 0);
log('Error rate (part 1): ' + errorRate);
