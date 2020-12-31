let rules = Object.fromEntries(data.split('\n').map(rule => rule.replace('.', '').split(' bags contain ')).map(rule => [rule[0], rule[1].split(', ').map(inner => inner.replace(/ bags?$/, '').replace(' ', ',').split(',', 2))]));
let cache = {};
function canContain(rule, bag) {
    if (cache.hasOwnProperty(rule[1])) {
        return cache[rule[1]];
    }
    let hasBag = false;
    if (rule[1][0][0] != 'no') {
        hasBag = rule[1].reduce((hasBag, inner) => hasBag || inner[1] == bag || canContain([inner[1], rules[inner[1]]], bag), false);
    }
    cache[rule[1]] = hasBag;
    return hasBag;
}
let colors = Object.entries(rules).reduce((colors, rule) => colors + canContain(rule, 'shiny gold'), 0);
log('Possible bag colors (part 1): ' + colors);
