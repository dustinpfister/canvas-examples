var utils = {};

// create a canvas element
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
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};

utils.getCanvasRelative = function (e) {
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

utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};

utils.mkButtonLayout = function (opt) {
    var blObj = {};
    opt = opt || {};
    blObj.buttons = opt.buttons || [];
    blObj.attachTo = opt.attachTo || window;
    blObj.handler = function (e) {
        e.preventDefault();
        var pos = utils.getCanvasRelative(e),
        i = opt.buttons.length,
        b;
        while (i--) {
            b = opt.buttons[i];
            if (utils.boundingBox(pos.x, pos.y, 1, 1, b.x, b.y, b.w, b.h)) {
                if (b.onAction) {
                    b.onAction.call({
                        opt: opt,
                        pos: pos,
                        button: b,
                        e: e
                    }, pos, opt, b, e);
                }
                break;
            }
        }
        return false;
    };
    blObj.attachTo.addEventListener('click', blObj.handler);
    return blObj;
};