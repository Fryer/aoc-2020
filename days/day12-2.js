let moves = data.split('\n').map(move => [move[0], move.slice(1) * 1]);
let x = 0;
let y = 0;
let wx = 10;
let wy = 1;
moves.forEach(move => {
    let nwx, nwy;
    switch (move[0]) {
        case 'N':
            wy += move[1];
            break;
        case 'S':
            wy -= move[1];
            break;
        case 'E':
            wx += move[1];
            break;
        case 'W':
            wx -= move[1];
            break;
        case 'L':
            nwx = wx * Math.cos(move[1] * Math.PI / 180) - wy * Math.sin(move[1] * Math.PI / 180);
            nwy = wy * Math.cos(move[1] * Math.PI / 180) + wx * Math.sin(move[1] * Math.PI / 180);
            wx = nwx;
            wy = nwy;
            break;
        case 'R':
            nwx = wx * Math.cos(move[1] * Math.PI / 180) + wy * Math.sin(move[1] * Math.PI / 180);
            nwy = wy * Math.cos(move[1] * Math.PI / 180) - wx * Math.sin(move[1] * Math.PI / 180);
            wx = nwx;
            wy = nwy;
            break;
        case 'F':
            x += wx * move[1];
            y += wy * move[1];
            break;
    }
});
let distance = Math.round(Math.abs(x) + Math.abs(y));
log('Distance travelled (part 2): ' + distance);
