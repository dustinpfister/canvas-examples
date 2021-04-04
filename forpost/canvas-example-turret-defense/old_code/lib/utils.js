var u = {
    defaultAngleScale: Math.PI * 2
};

// mathematical modulo
u.mod = function (x, m) {
    return (x % m + m) % m;
};

u.normalizeHalf = function (n, scale) {
    var c = scale || u.defaultAngleScale,
    h = c / 2;
    return u.mod(n + h, c) - h;
};

// distance
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// the angular distance between two angles
u.angleDistance = function (a, b, scale) {
    var m = scale || u.defaultAngleScale,
    h = m / 2,
    diff = u.normalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};

// get the angle from one point to another
u.getAngleToPoint = function (pt1, pt2) {
    return u.normalizeHalf(Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x));
};

// get -1, 1, or 0 depending on the the state of two angles
u.shortestAngleDirection = function (a1, a2) {
    var z = a1 - a2,
    x = u.normalizeHalf(z);
    if (x < 0) {
        return -1; // Left
    }
    if (x > 0) {
        return 1; // Right
    }
    // if a1 === a2 or any other case
    return 0;
};

u.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};

u.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
