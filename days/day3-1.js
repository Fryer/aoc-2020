let rows = data.split('\n').map(row => row.split('').map(cell => cell == '#'));
let trees = 0;
for (let y = 0, x = 0; y < rows.length; y++, x = (x + 3) % rows[0].length) {
    trees += rows[y][x];
}
log('Trees encountered (part 1): ' + trees);
