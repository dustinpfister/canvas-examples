
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

var state = {
    pool: [],
    spawnRate: 1,
    secs: 0
};

var i = 10;
while (i--) {
    state.pool.push({
        x: 0,
        y: 0,
        w: 32,
        h: 32,
        heading: 0,
        pps: 32,
        active: false
    });
}

var loop = function () {
    requestAnimationFrame();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var i = bx.pool.length,
    b;
    while (i--) {
        bx = state.pool[i];
        if (bx.active) {
            bx.fillRect(bx.x, bx.y, bx.w, bx.h);
        }
    }

};
loop();
