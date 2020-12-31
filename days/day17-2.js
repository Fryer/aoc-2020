let lines = data.split('\n');
let cubes = {};
let offsets = [];
for (let i = 0; i < 81; i++) {
    if (i % 3 - 1 != 0 || Math.floor(i / 3) % 3 - 1 != 0 || Math.floor(i / 9) % 3 - 1 != 0 || Math.floor(i / 27) % 3 - 1 != 0) {
        offsets.push([i % 3 - 1, Math.floor(i / 3) % 3 - 1, Math.floor(i / 9) % 3 - 1, Math.floor(i / 27) % 3 - 1]);
    }
}
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines.length; x++) {
        if (lines[y][x] == '#') {
            cubes[[x, y, 0, 0]] = true;
            for (let o of offsets) {
                let p = [x + o[0], y + o[1], o[2], o[3]];
                if (!cubes.hasOwnProperty(p)) {
                    cubes[p] = false;
                }
            }
        }
    }
}
for (let t = 0; t < 6; t++) {
    let newCubes = {};
    for (let [p, cube] of Object.entries(cubes)) {
        p = p.split(',').map(p => +p);
        let near = 0;
        for (let o of offsets) {
            let op = [p[0] + o[0], p[1] + o[1], p[2] + o[2], p[3] + o[3]];
            if (cubes.hasOwnProperty(op) && cubes[op]) {
                near++;
            }
        }
        newCubes[p] = cube ? (near == 2 || near == 3) : near == 3;
        if (newCubes[p]) {
            for (let o of offsets) {
                let op = [p[0] + o[0], p[1] + o[1], p[2] + o[2], p[3] + o[3]];
                if (!newCubes.hasOwnProperty(op)) {
                    newCubes[op] = false;
                }
            }
        }
    }
    cubes = newCubes;
}
let activeCubes = Object.values(cubes).reduce((activeCubes, cube) => activeCubes + cube, 0);
log('Active hypercubes (part 2): ' + activeCubes);
