let players = data.split('\n\n').map(player => player.split(':\n')[1]).map(player => player.split('\n').map(card => +card));
function play(players) {
    let previous = new Set();
    while (players[0].length > 0 && players[1].length > 0) {
        if (previous.has(players[0] + ' ' + players[1])) {
            return 0;
        }
        previous.add(players[0] + ' ' + players[1]);
        let topA = players[0].shift();
        let topB = players[1].shift();
        let winner = topA > topB ? 0 : 1;
        if (players[0].length >= topA && players[1].length >= topB) {
            winner = play([players[0].slice(0, topA), players[1].slice(0, topB)]);
        }
        if (winner == 0) {
            players[0].push(topA, topB);
        }
        else {
            players[1].push(topB, topA);
        }
    }
    return players[0].length ? 0 : 1;
}
let winner = play(players, 1);
let score = players[winner].reverse().reduce((score, card, i) => score += card * (i + 1), 0);
log('Winning score (part 2): ' + score);
