let instructions = data.split('\n');
let flipped = new Set();
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
    }
}
log('Black tiles (part 1): ' + flipped.size);
