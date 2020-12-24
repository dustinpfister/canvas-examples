var utils = {};

// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};

// return a canvas realtive point from the given Mouse or Touch event Object
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};

// get a distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};


// ANGLES

// Wrap a radian value
utils.wrapRadian = function(radian){
    return utils.mod(radian, Math.PI * 2);
};

// get the angle from one point to another
utils.angleTo = function(fromX, fromY, toX, toY){
    return utils.wrapRadian(Math.atan2(toY - fromY, toX - fromX) + Math.PI);
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
utils.log1 = function (n, d, mode) {
    var per = utils.per(n, d, 'per');
    if(mode === 'per'){
        return utils.clampPer(Math.log(1 + per) / Math.log(2));
    }
    per = n;
    return (Math.pow(2, 1 + per) / 2 - 1) * d;
};

// 'log2' percent method that uses Math.log with a range between a base and max per
utils.log2 = function (n, d, mode, basePer, maxPer) {
    basePer = basePer === undefined ? 0.25 : basePer;
    maxPer = maxPer === undefined ? 0.75 : maxPer;
    var logPer = utils.log1(n, d, 'per'),
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
        // a is a numerator return a percent value
        var n = a;
        var per = utils.per(n, d, 'per');
        return Math.log(1 + per) / Math.log(2 + p1);
    }
    // a is a percent return a numerator
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
            perMethod: opt.perMethod || 'log3',
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
            level: Math.floor(l) + 1,
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
        console.log(per);
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
                x: table.w / (opt.levelCap-1) * l,
                y: table.h - (levelObj.xp / levelObj.expCap) * table.h
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