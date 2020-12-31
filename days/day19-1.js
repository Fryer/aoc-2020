let [rules, msgs] = data.split('\n\n');
rules = Object.fromEntries(rules.split('\n').map(rule => rule.split(': ')));
function expand(rule) {
    if (rule[0] == '"') {
        return rule[1];
    }
    return '(' + rule.split(' ').reduce((rule, part) => rule + (part == '|' ? '|' : expand(rules[part])), '') + ')';
}
let rule = new RegExp('^' + expand(rules[0]) + '$', 'gm');
let matches = msgs.match(rule).length;
log('Messages lines (part 1): ' + matches);
