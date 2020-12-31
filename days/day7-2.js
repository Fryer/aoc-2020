let rules = Object.fromEntries(data.split('\n').map(rule => rule.replace('.', '').split(' bags contain ')).map(rule => [rule[0], rule[1].split(', ').map(inner => inner.replace(/ bags?$/, '').replace(' ', ',').split(',', 2))]));
let cache = {};
function bagsInside(bag) {
    let rule = rules[bag];
    if (cache.hasOwnProperty(bag)) {
        return cache[bag];
    }
    let inside = 0;
    if (rule[0][0] != 'no') {
        inside = rule.reduce((inside, inner) => inside + inner[0] * (1 + bagsInside(inner[1])), 0);
    }
    cache[bag] = inside;
    return inside;
}
log('Bags contained (part 2): ' + bagsInside('shiny gold'));
