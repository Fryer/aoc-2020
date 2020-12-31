let chain = [0].concat(data.split('\n').map(jolts => jolts * 1).sort((a, b) => a - b));
chain.push(chain[chain.length - 1] + 3);
function subArrangements(chain) {
    return chain.slice(1, -1).reduce((total, jolts, i) => total + (chain[i + 1] - chain[i - 1] <= 3 ? subArrangements([chain[i - 1]].concat(chain.slice(i + 1))) : 0), 1);
}
function arrangements(chain) {
    let total = 1;
    let subChainStart = 0;
    for (let i = 1; i < chain.length; i++) {
        if (chain[i] - chain[i - 1] == 3) {
            total *= subArrangements(chain.slice(subChainStart, i + 1));
            subChainStart = i;
        }
    }
    return total;
}
log('Possible arrangements (part 2): ' + arrangements(chain));
