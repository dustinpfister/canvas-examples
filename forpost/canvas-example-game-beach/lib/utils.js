var utils = {};

utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

utils.XP = (function () {
    // set level with given xp
    var set = function (xp) {
        //return Math.sqrt(xp);
        return (1 + Math.sqrt(1 + 8 * xp / 50)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var XPto = function (level) {
        //return Math.pow(level, 2);
        return ((Math.pow(level, 2) - level) * 50) / 2;
    };
    var parseByXP = function (xp, cap) {
        var l = set(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = XPto(level + 1);
        return {
            level: level,
            levelFrac: l,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        parseByLevel: function (l, cap) {
            return parseByXP(XPto(l, cap));
        },
        parseByXP: parseByXP
    };
}
    ());
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
// get a canvas relative position that is ajusted for scale
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