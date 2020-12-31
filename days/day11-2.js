let rows = data.split('\n');
let w = rows[0].length;
let h = rows.length;
let newSeats = data.replaceAll('\n', '');
let seatOffsets = newSeats.split('').map((seat, i) => {
    function trace(x, y, dx, dy) {
        x += dx;
        y += dy;
        while (x >= 0 && y >= 0 && x < w && y < h) {
            let i = y * w + x;
            if (newSeats[i] != '.') {
                return [i];
            }
            x += dx;
            y += dy;
        }
        return [];
    }
    let x = i % w;
    let y = Math.floor(i / w);
    return trace(x, y, -1, -1)
        .concat(trace(x, y, 0, -1))
        .concat(trace(x, y, 1, -1))
        .concat(trace(x, y, -1, 0))
        .concat(trace(x, y, 1, 0))
        .concat(trace(x, y, -1, 1))
        .concat(trace(x, y, 0, 1))
        .concat(trace(x, y, 1, 1));
});
let seats = '';
while (seats != newSeats) {
    seats = newSeats;
    newSeats = '';
    seats.split('').forEach((seat, i) => {
        if (seat == '.') {
            newSeats += '.';
            return;
        }
        let offsets = seatOffsets[i];
        let adjacent = offsets.reduce((adjacent, offset) => adjacent + (offset >= 0 && offset < seats.length ? seats[offset] == '#' : 0), 0);
        if (seat == 'L' && adjacent == 0) {
            newSeats += '#';
        }
        else if (seat == '#' && adjacent >= 5) {
            newSeats += 'L';
        }
        else {
            newSeats += seat;
        }
    });
}
let occupied = seats.split('').reduce((occupied, seat) => occupied + (seat == '#'), 0);
log('Occupied seats (part 2): ' + occupied);
