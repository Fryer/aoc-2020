let instructions = data.split('\n');
let flipped = new Set();
let tiles = {};
for (let instruction of instructions) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < instruction.length; i++) {
        let c = instruction[i];
        let n = instruction[i + 1];
        if (c == 'n') {
            y--;
            if (n == 'w') {
                x--;
            }
            i++;
        }
        else if (c == 's') {
            y++;
            if (n == 'e') {
                x++;
            }
            i++;
        }
        else if (c == 'w') {
            x--;
        }
        else if (c == 'e') {
            x++;
        }
    }
    if (flipped.has([x, y].toString())) {
        flipped.delete([x, y].toString());
    }
    else {
        flipped.add([x, y].toString());
        tiles[[x, y]] = [x, y];
        tiles[[x - 1, y - 1]] = [x - 1, y - 1];
        tiles[[x, y - 1]] = [x, y - 1];
        tiles[[x, y + 1]] = [x, y + 1];
        tiles[[x + 1, y + 1]] = [x + 1, y + 1];
        tiles[[x - 1, y]] = [x - 1, y];
        tiles[[x + 1, y]] = [x + 1, y];
    }
}
for (let i = 0; i < 100; i++) {
    let newFlipped = new Set();
    let newTiles = {};
    for (let [x, y] of Object.values(tiles)) {
        let neighbors = 0;
        neighbors += flipped.has([x - 1, y - 1].toString());
        neighbors += flipped.has([x, y - 1].toString());
        neighbors += flipped.has([x, y + 1].toString());
        neighbors += flipped.has([x + 1, y + 1].toString());
        neighbors += flipped.has([x - 1, y].toString());
        neighbors += flipped.has([x + 1, y].toString());
        if ((flipped.has([x, y].toString()) && neighbors != 0 && neighbors <= 2) || (!flipped.has([x, y].toString()) && neighbors == 2)) {
            newFlipped.add([x, y].toString());
            newTiles[[x, y]] = [x, y];
            newTiles[[x - 1, y - 1]] = [x - 1, y - 1];
            newTiles[[x, y - 1]] = [x, y - 1];
            newTiles[[x, y + 1]] = [x, y + 1];
            newTiles[[x + 1, y + 1]] = [x + 1, y + 1];
            newTiles[[x - 1, y]] = [x - 1, y];
            newTiles[[x + 1, y]] = [x + 1, y];
        }
    }
    tiles = newTiles;
    flipped = newFlipped;
}
log('Black tiles (part 2): ' + flipped.size);
