let moves = data.split('\n').map(move => [move[0], move.slice(1) * 1]);
visualize(900, 700);
let start = performance.now() / 1000;
let drawing = false;
while (!drawing) {
    let now = performance.now() / 1000 - start;
    fillStyle('#028');
    fillRect(0, 0, 900, 700);
    moveTo(750, 350);
    let x = 0;
    let y = 0;
    let a = 0;
    let time = 0;
    let drawing = true;
    let cx = 0;
    let cy = 0;
    let ca = 0;
    moves.forEach(move => {
        if (!drawing) {
            return;
        }
        let dx = 0;
        let dy = 0;
        let da = 0;
        switch (move[0]) {
            case 'N':
                y += move[1];
                dy = move[1];
                break;
            case 'S':
                y -= move[1];
                dy = -move[1];
                break;
            case 'E':
                x += move[1];
                dx = move[1];
                break;
            case 'W':
                x -= move[1];
                dx = -move[1];
                break;
            case 'L':
                a += move[1] * Math.PI / 180;
                da = move[1] * Math.PI / 180;
                break;
            case 'R':
                a -= move[1] * Math.PI / 180;
                da = -move[1] * Math.PI / 180;
                break;
            case 'F':
                x += move[1] * Math.cos(a);
                y += move[1] * Math.sin(a);
                dx = move[1] * Math.cos(a);
                dy = move[1] * Math.sin(a);
                break;
        }
        let dt = move[1] / 720;
        let interp = 0;
        cx = x;
        cy = y;
        ca = a;
        if (time + dt > now) {
            interp = (time + dt - now) / dt;
            cx = x - dx * interp;
            cy = y - dy * interp;
            ca = a - da * interp;
            drawing = false;
        }
        time += dt;
        lineTo(750 + cx / 2, 350 - cy / 2);
    });
    lineWidth(2);
    strokeStyle('#f80');
    stroke();
    fillStyle('#0f0');
    fillRect(745, 345, 10, 10);
    let distance = Math.round(Math.abs(cx) + Math.abs(cy));
    if (drawing) {
        fillStyle('#f00');
        fillRect(745 + x / 2, 345 - y / 2, 10, 10);
    }
    else {
        lineWidth(10);
        moveTo(750 + cx / 2 - 5 * Math.cos(ca), 350 - cy / 2 + 5 * Math.sin(ca));
        lineTo(750 + cx / 2 + 10 * Math.cos(ca), 350 - cy / 2 - 10 * Math.sin(ca));
        stroke();
    }
    font('bold 16px monospace');
    textAlign('center');
    fillStyle('#fff');
    fillText('Distance: ' + distance, 750 + cx / 2, 370 - cy / 2);
    await(drawFrame());
}
