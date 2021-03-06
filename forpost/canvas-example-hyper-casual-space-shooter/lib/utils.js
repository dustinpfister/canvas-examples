var utils = {};

// create a canvas element
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.canvas.className = 'canvas_example';
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    opt.ctx.translate(0.5, 0.5);
    return opt;
};

// return a canvas realtive point from the given Mouse or Touch event Object
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    return pos;
};


// format number as money
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
utils.format_money = function(number){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(number); /* $2,500.00 */
};

// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};

// get a distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};

// ANGLES

// Wrap a radian value
utils.wrapRadian = function(radian){
    return utils.mod(radian, Math.PI * 2);
};

// get the angle from one point to another
utils.angleTo = function(toX, toY, fromX, fromY){
    return utils.wrapRadian(Math.atan2(fromY - toY, fromX - toX) + Math.PI);
};

utils.normalizeHalf = function(n, scale) {
    var c = scale || Math.PI * 2;
    var h = c / 2;
    return utils.mod(n + h, c) - h;
};

utils.shortestDirection = function(from, to, scale) {
    var z = from - to;
    if (from === to) {
        return 0;
    } else if (utils.normalizeHalf(z, scale) < 0) {
        return -1; // Left
    } else {
        return +1; // Right
    }
};

// deep clone an object
//utils.deepClone = function (obj) {
//    return JSON.parse(JSON.stringify(obj));
//};
utils.deepClone = function(obj){
    var clone = {}; // clone is a new object
    for(var i in obj) {
        if(typeof(obj[i])=="object" && obj[i] != null){
            clone[i] = utils.deepClone(obj[i]);
            // create as Array if source object is Array
            if(obj[i].constructor.name === 'Array'){
                clone[i].length = Object.keys(clone[i]).length;
                clone[i] = Array.from(clone[i]);
            }
        }else{
            clone[i] = obj[i];
        }
    }
    return clone;
};

// PERCENT METHODS

// clamp a percent value
utils.clampPer = function (per) {
    if (per > 1) {
        return 1;
    }
    if (per < 0) {
        return 0;
    }
    return per;
};

// basic percent method that will return a percent or numerator depeding on mode
utils.per = function(a, d, mode){
    mode = mode === undefined ? 'per' : mode;
    if(mode === 'per'){
        // a is a numerator return a percent value
        return utils.clampPer(a / d);
    }
    // a is a percent return a numerator
    return a * d;
};

// basic percent method that makes use of Math.log
utils.log1 = function (a, d, mode) {
    var per;
    if(mode === 'per'){
        // a = 'numerator value', return a percent value
        per = utils.per(a, d, 'per');
        return utils.clampPer(Math.log(1 + per) / Math.log(2));
    }
    // a = 'percent value', return a numerator
    per = a;
    return (Math.pow(2, 1 + per) / 2 - 1) * d;
};

// 'log2' percent method that uses Math.log with a range between a base and max per
utils.log2 = function (a, d, mode, basePer, maxPer) {
    basePer = basePer === undefined ? 0.25 : basePer;
    maxPer = maxPer === undefined ? 0.75 : maxPer;
    var logPer = utils.log1(a, d, 'per'),
    range = maxPer - basePer,
    per = basePer + range * logPer;

    if(mode === 'per'){
        return utils.clampPer(per);
    }
    // no 'n' mode for log2 yet
    return 0;
};

// log3 percent method
utils.log3 = function (a, d, mode, p1) {
    mode = mode === undefined ? 'per' : mode;
    p1 = p1 === undefined ? 12 : p1;
    if(mode === 'per'){
        // a = 'numerator value', return a percent value
        var n = a;
        var per = utils.per(n, d, 'per');
        return Math.log(1 + per) / Math.log(2 + p1);
    }
    // a = 'percent value', return a numerator
    var per = a;
    var base = 2 + p1;
    return ((Math.pow(base, 1 + per) / base - 1) * d);
};

// LEVEL OBJECT

utils.xp = (function(){
    // public API for utils.xp
    var xpAPI = {};
    // create an options object to use with byLevel and byExp methods
    xpAPI.createOptions = function(opt){
        opt = opt || {};
        return {
            levelCap: opt.levelCap || 100,
            expCap: opt.expCap || 1000,
            perMethod: opt.perMethod || 'log1', //'log3',
            perArgs: opt.perArgs || [0],
            tableWidth: opt.tableWidth || 25,
            tableHeight: opt.tableHeight || 25,
            tableX: opt.tableX === undefined ? 0 : opt.tableX,
            tableY: opt.tableY === undefined ? 0 : opt.tableY
        };
    };
    // create a standard level Object
    var createLevelObject = function(xp, opt){
        xp = xp >= opt.expCap ? opt.expCap : xp;
        xp = xp < 0 ? 0 : xp;
        var l = utils[opt.perMethod].apply(null, [xp / opt.expCap, opt.levelCap, 'n'].concat(opt.perArgs));
        l = l >= opt.levelCap ? opt.levelCap - 1 : l;
        l = l < 0 ? 0 : l;
        return {
            opt: opt,
            l: l,
            level: Math.round(l) + 1,
            levelCap: opt.levelCap,
            perToLevelCap: l / ( opt.levelCap - 1 ),
            xp: xp,
            xpForNext: null,
            expCap: opt.expCap,
            valueOf: function(){
                return this.level;
            }
        };
    };
    var getXPByLevel = function(l, opt){
        var per = utils[opt.perMethod].apply(null, [l, opt.levelCap, 'per'].concat(opt.perArgs));
        return opt.expCap * per;
    };
    var appendXPForNext = function(levelObj){
        if(levelObj.level < levelObj.levelCap){
            levelObj.xpForNext = getXPByLevel(levelObj.level, levelObj.opt)
        }else{
            // what to set xp for next when the current level is at level cap
            levelObj.xpForNext = Infinity;
        }
    };
    // create a levelObject by 'l' and 'opt' where 'l' is a ZERO RELATIVE level number that
    // can be a function, and 'opt' is an options object that contains values for levelCap, ect
    xpAPI.byLevel = function(l, opt){
        opt = xpAPI.createOptions(opt);
        l = l >= opt.levelCap ? opt.levelCap - 1 : l;
        l = l < 0 ? 0 : l;
        var per = utils[opt.perMethod].apply(null, [l, opt.levelCap, 'per'].concat(opt.perArgs));
        var levelObj = createLevelObject(opt.expCap * per, opt);
        appendXPForNext(levelObj);
        return levelObj;
    };
    // create a levelObject by a 'xp' value where 'xp' is a number between 0 and opt.expCap
    // and 'opt' is an options object the contains properties such as opt.expCap
    xpAPI.byExp = function(xp, opt){
        opt = xpAPI.createOptions(opt);
        var levelObj = createLevelObject(xp, opt);
        appendXPForNext(levelObj);
        return levelObj;
    };
    // create a table of levelObjects for the given options object
    xpAPI.createTable = function(opt){
        opt = xpAPI.createOptions(opt);
        var l = 0,
        levelObj,
        table = {
            levelObjArray : [],
            points: [],
            w: opt.tableWidth,
            h: opt.tableHeight,
            x: opt.tableX,
            y: opt.tableY
        };
        while(l < opt.levelCap){
            levelObj = table.levelObjArray[l] = xpAPI.byLevel(l, opt);
            table.points[l] = {
                x: table.w / (opt.levelCap-1) * levelObj.l,
                y: table.h - (levelObj.xp / levelObj.expCap) * table.h
                //x: table.w / opt.levelCap * levelObj.level,
                //y: table.h - (levelObj.level / levelObj.levelCap) * table.h
            };
            l += 1;
        }
        return table;
    };
    // create an upgrade object
    xpAPI.createUpgrade = function(desc, levelIndex, applyToState, opt){
        opt = xpAPI.createOptions(opt);
        var upgrade = xpAPI.createTable(opt);
        upgrade.opt = opt; // store the options used to create a level object
        upgrade.desc = desc || '';
        upgrade.levelIndex = levelIndex || 0;
        upgrade.levelObj = upgrade.levelObjArray[upgrade.levelIndex];
        upgrade.applyToState = applyToState || function(){};
        return upgrade;
    };
    return xpAPI;
}());