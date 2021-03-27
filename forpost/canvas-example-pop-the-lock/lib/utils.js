var utils = {};
// no operation ref
utils.noop = function(){};
// is NaN method
utils.isNaN = function (a) {
    return String(a) === 'NaN' && typeof a != 'string';
};
// get diminishing returns percent value for the given number and base
utils.getDimPer = function(n, base){
    base = base === undefined ? 2 : base;
    return Math.log(base - (base - 1) * 1 / (n + 1), base) / Math.log(base, base);
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
// clamp a 0 - 1 value
utils.clampPer = function (per) {
    per = per > 1 ? 1 : per;
    per = per < 0 ? 0 : per;
    return per;
};
// get a random number between the given range
utils.randomRange = function(a, b){
    var x = a, y = b;
    if(typeof a === 'object'){
        x = a[0];
        y = a[1];
    }
    return x + (y - x) * Math.random();
};
// normalizeHalf
utils.normalizeHalf = function(degree, scale) {
  var halfScale = scale / 2;
  return utils.mod(degree + halfScale, scale) - halfScale;
};
// shortest distance
utils.shortestDistance = function(a, b, scale) {
  var halfScale = scale / 2,
  diff = utils.normalizeHalf(a - b, scale);
  if (diff > halfScale){
    diff = diff - scale;
  }
  return Math.abs(diff);
};
// create a canvas
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
// get canvas relative point
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
// save a state
utils.save = function(appName, slotID, state){
    var key = appName + '-' + slotID;
    var str = JSON.stringify(state);
    localStorage.setItem(key, str);
};
// load a state
utils.load = function(appName, slotID){
    var key = appName + '-' + slotID;
    var str = localStorage.getItem(key);
    if(str){
        try{
            return JSON.parse(str);
        }catch(e){
            return false;
        }
    }
    return false;
};
// delete a state
utils.del = function(appName, slotID){
    var key = appName + '-' + slotID;
    localStorage.removeItem(key);
};

