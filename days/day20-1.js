let tiles = Object.fromEntries(data.split('\n\n').map(tile => tile.split(':\n')).map(tile => [tile[0].split(' ')[1], tile[1]]));
let tilesAtBorders = {};
let tileBorders = {};
for (let [id, tile] of Object.entries(tiles)) {
    let top = tile.split('\n')[0];
    let topFlip = top.split('').slice().reverse().join('');
    let bottom = tile.split('\n').pop();
    let bottomFlip = bottom.split('').slice().reverse().join('');
    let left = tile.split('\n').map(p => p[0]).join('');
    let leftFlip = left.split('').slice().reverse().join('');
    let right = tile.split('\n').map(p => p.split('').pop()).join('');
    let rightFlip = right.split('').slice().reverse().join('');
    tileBorders[id] = [top, topFlip, bottom, bottomFlip, left, leftFlip, right, rightFlip];
    tileBorders[id].forEach(border => {
        if (!tilesAtBorders.hasOwnProperty(border)) {
            tilesAtBorders[border] = [];
        }
        tilesAtBorders[border].push(id);
    });
}
let multiplied = 1;
for (let [id, borders] of Object.entries(tileBorders)) {
    let tileNeighbors = new Set();
    for (let border of borders) {
        tilesAtBorders[border].forEach(nId => tileNeighbors.add(nId));
    }
    tileNeighbors.delete(id);
    if (tileNeighbors.size == 2) {
        multiplied *= id;
    }
}
log('Multiplied corners (part 1): ' + multiplied);
