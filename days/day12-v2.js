let moves = data.split('\n').map(move => [move[0], move.slice(1) * 1]);
let canvas = document.createElement('canvas');
canvas.id = 'visualization';
canvas.width = 1000;
canvas.height = 700;
document.getElementById('overlay').appendChild(canvas);
let ctx = canvas.getContext('2d');
let start = performance.now() / 1000;
function draw() {
    if (!canvas.parentNode) {
        return;
    }
    let now = performance.now() / 1000 - start;
    ctx.fillStyle = '#028';
    ctx.fillRect(0, 0, 1000, 700);
    ctx.beginPath();
    ctx.moveTo(850, 450);
    let x = 0;
    let y = 0;
    let wx = 10;
    let wy = 1;
    let time = 0;
    let drawing = true;
    let cx = 0;
    let cy = 0;
    let cwx = 0;
    let cwy = 0;
    moves.forEach(move => {
        if (!drawing) {
            return;
        }
        let dx = 0;
        let dy = 0;
        let dwx = 0;
        let dwy = 0;
        let dwa = 0;
        let nwx, nwy;
        switch (move[0]) {
            case 'N':
                wy += move[1];
                dwy = move[1];
                break;
            case 'S':
                wy -= move[1];
                dwy = -move[1];
                break;
            case 'E':
                wx += move[1];
                dwx = move[1];
                break;
            case 'W':
                wx -= move[1];
                dwx = -move[1];
                break;
            case 'L':
                nwx = wx * Math.cos(move[1] * Math.PI / 180) - wy * Math.sin(move[1] * Math.PI / 180);
                nwy = wy * Math.cos(move[1] * Math.PI / 180) + wx * Math.sin(move[1] * Math.PI / 180);
                wx = nwx;
                wy = nwy;
                dwa = move[1];
                break;
            case 'R':
                nwx = wx * Math.cos(move[1] * Math.PI / 180) + wy * Math.sin(move[1] * Math.PI / 180);
                nwy = wy * Math.cos(move[1] * Math.PI / 180) - wx * Math.sin(move[1] * Math.PI / 180);
                wx = nwx;
                wy = nwy;
                dwa = -move[1];
                break;
            case 'F':
                x += wx * move[1];
                y += wy * move[1];
                dx = wx * move[1];
                dy = wy * move[1];
                break;
        }
        let dt = (move[0] == 'F' ? Math.sqrt(dx * dx + dy * dy) / 10 : move[1]) / 720;
        let interp = 0;
        cx = x;
        cy = y;
        cwx = x + wx * 50;
        cwy = y + wy * 50;
        if (time + dt > now) {
            interp = (time + dt - now) / dt;
            cx = x - dx * interp;
            cy = y - dy * interp;
            cwx = cx + wx * 50 * Math.cos(dwa * interp * Math.PI / 180) + wy * 50 * Math.sin(dwa * interp * Math.PI / 180) - dwx * 50 * interp;
            cwy = cy + wy * 50 * Math.cos(dwa * interp * Math.PI / 180) - wx * 50 * Math.sin(dwa * interp * Math.PI / 180) - dwy * 50 * interp;
            drawing = false;
        }
        time += dt;
        ctx.lineTo(850 + cx / 80, 450 - cy / 80);
    });
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f80';
    ctx.stroke();
    ctx.fillStyle = '#0f0';
    ctx.fillRect(845, 445, 10, 10);
    let distance = Math.round(Math.abs(cx) + Math.abs(cy));
    if (drawing) {
        ctx.fillStyle = '#f00';
        ctx.fillRect(845 + x / 80, 445 - y / 80, 10, 10);
    }
    else {
        ctx.fillStyle = '#ff0';
        ctx.fillRect(844 + cwx / 80, 448 - cwy / 80, 12, 4);
        ctx.fillRect(848 + cwx / 80, 444 - cwy / 80, 4, 12);
        ctx.beginPath();
        ctx.lineWidth = 10;
        let ca = Math.atan2(cwy - cy, cwx - cx);
        ctx.moveTo(850 + cx / 80 - 5 * Math.cos(ca), 450 - cy / 80 + 5 * Math.sin(ca));
        ctx.lineTo(850 + cx / 80 + 10 * Math.cos(ca), 450 - cy / 80 - 10 * Math.sin(ca));
        ctx.stroke();
        requestAnimationFrame(draw);
    }
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('Distance: ' + distance, 850 + cx / 80, 470 - cy / 80);
}
requestAnimationFrame(draw);
