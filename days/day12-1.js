let moves = data.split('\n').map(move => [move[0], move.slice(1) * 1]);
let x = 0;
let y = 0;
let a = 0;
moves.forEach(move => {
    switch (move[0]) {
        case 'N':
            y += move[1];
            break;
        case 'S':
            y -= move[1];
            break;
        case 'E':
            x += move[1];
            break;
        case 'W':
            x -= move[1];
            break;
        case 'L':
            a += move[1] * Math.PI / 180;
            break;
        case 'R':
            a -= move[1] * Math.PI / 180;
            break;
        case 'F':
            x += move[1] * Math.cos(a);
            y += move[1] * Math.sin(a);
            break;
    }
});
let distance = Math.round(Math.abs(x) + Math.abs(y));
log('Distance travelled (part 1): ' + distance);
