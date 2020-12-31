let moves = data.split('\n').map(move => [move[0], move.slice(1) * 1]);
let canvas = document.createElement('canvas');
canvas.id = 'visualization';
canvas.width = 900;
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
    ctx.fillRect(0, 0, 900, 700);
    ctx.beginPath();
    ctx.moveTo(750, 350);
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
        ctx.lineTo(750 + cx / 2, 350 - cy / 2);
    });
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f80';
    ctx.stroke();
    ctx.fillStyle = '#0f0';
    ctx.fillRect(745, 345, 10, 10);
    let distance = Math.round(Math.abs(cx) + Math.abs(cy));
    if (drawing) {
        ctx.fillStyle = '#f00';
        ctx.fillRect(745 + x / 2, 345 - y / 2, 10, 10);
    }
    else {
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.moveTo(750 + cx / 2 - 5 * Math.cos(ca), 350 - cy / 2 + 5 * Math.sin(ca));
        ctx.lineTo(750 + cx / 2 + 10 * Math.cos(ca), 350 - cy / 2 - 10 * Math.sin(ca));
        ctx.stroke();
        requestAnimationFrame(draw);
    }
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('Distance: ' + distance, 750 + cx / 2, 370 - cy / 2);
}
requestAnimationFrame(draw);
