var aniState = {
    frame: 0,
    maxFrame: 240,

    disp: [],

    circles: 8,
    circleRadiusMin: 5,
    circleRadiusMax: 35,

    // initialize the animation state
    init: function () {
        var i = this.circles;
        while (i--) {
            disp = {
                x: 0,
                y: 0,
                radius: 10
            };
            this.disp.push(disp);
        }
        this.forFrame(0, this.maxFrame);
    },

    // for each frame
    forFrame: function () {
        var i = this.circles,
        disp,
        cx = 160,
        cy = 120,
        radius = 0,
        per = this.frame / this.maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        rad;
        while (i--) {
            disp = this.disp[i];
            radius = 25 + 75 * bias;
            rad = Math.PI * 2 / this.circles * i + Math.PI * 2 * per;
            disp.x = cx + Math.cos(rad) * radius;
            disp.y = cy + Math.sin(rad) * radius;
            disp.radius = this.circleRadiusMin + (this.circleRadiusMax - this.circleRadiusMin) * bias;
        }
        this.frame += 1;
        this.frame %= this.maxFrame;
    }
};

// draw to the canvas
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    aniState.disp.forEach(function (disp) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(disp.x, disp.y, disp.radius, 0, Math.PI * 2);
        ctx.fill();
    });
};

// get canvas and initialize state
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
aniState.init();

// Main APP loop
var loop = function () {
    requestAnimationFrame(loop);
    draw();
    aniState.forFrame();
};
loop();
