let players = data.split('\n\n').map(player => player.split(':\n')[1]).map(player => player.split('\n').map(card => +card));
while (players[0].length > 0 && players[1].length > 0) {
    let topA = players[0].shift();
    let topB = players[1].shift();
    if (topA > topB) {
        players[0].push(topA, topB);
    }
    else {
        players[1].push(topB, topA);
    }
}
let winner = players[0].length ? players[0] : players[1];
let score = winner.reverse().reduce((score, card, i) => score += card * (i + 1), 0);
log('Winning score (part 1): ' + score);
