var utils = {};

utils.createCanvas = function(opt){
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

utils.isMouse = function (e) {;
    return e.type.substr(0,5) === 'mouse';
};

utils.getCanvasRelativeArray = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos,
    arr = [];
    // mouse event
    if (utils.isMouse(e)) {
        pos = {
            x: e.clientX - bx.left,
            y: e.clientY - bx.top,
            bx: bx,
            e: e,
            touch: {}
        };
        // ajust for native canvas matrix size
        pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
        pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
        return [
            pos
        ];
    }
    // touch
    var i = 0,
    touch;
    while (i < e.targetTouches.length) {
        touch = e.targetTouches[i];
        pos = {
            x: touch.clientX - bx.left,
            y: touch.clientY - bx.top,
            touch: touch,
            e: e,
            bx: bx
        };
        // ajust for native canvas matrix size
        pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
        pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
        arr.push(pos);
        i += 1;
    }
    return arr;
};
