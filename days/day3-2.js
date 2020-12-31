let rows = data.split('\n').map(row => row.split('').map(cell => cell == '#'));
let slopes = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];
let multiplied = slopes.reduce((multiplied, slope) => {
    let trees = 0;
    for (let y = 0, x = 0; y < rows.length; y += slope[0], x = (x + slope[1]) % rows[0].length) {
        trees += rows[y][x];
    }
    return multiplied * trees;
}, 1);
log('Trees multiplied (part 2): ' + multiplied);
