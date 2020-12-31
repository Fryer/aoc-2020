let rows = data.split('\n');
let w = rows[0].length;
let h = rows.length;
let newSeats = data.replaceAll('\n', '');
let seats = '';
while (seats != newSeats) {
    seats = newSeats;
    newSeats = '';
    seats.split('').forEach((seat, i) => {
        if (seat == '.') {
            newSeats += '.';
            return;
        }
        let offsets = [];
        if (i % w > 0) offsets.push(-1);
        if (i % w < w - 1) offsets.push(1);
        if (i >= w) offsets.push(-w);
        if (i < h * w - w) offsets.push(w);
        if (i % w > 0 && i >= w) offsets.push(-w - 1);
        if (i % w < w - 1 && i >= w) offsets.push(-w + 1);
        if (i % w > 0) offsets.push(w - 1);
        if (i % w < w - 1) offsets.push(w + 1);
        let adjacent = offsets.reduce((adjacent, offset) => adjacent + (i + offset >= 0 && i + offset < seats.length ? seats[i + offset] == '#' : 0), 0);
        if (seat == 'L' && adjacent == 0) {
            newSeats += '#';
        }
        else if (seat == '#' && adjacent >= 4) {
            newSeats += 'L';
        }
        else {
            newSeats += seat;
        }
    });
}
let occupied = seats.split('').reduce((occupied, seat) => occupied + (seat == '#'), 0);
log('Occupied seats (part 1): ' + occupied);
