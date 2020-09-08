var XP = (function () {
    var DEFAULTS = {
        level: 1,
        xp: 0,
        cap: 30,
        deltaNext: 50
    };
    // set level with given xp
    var set = function (xp, deltaNext) {
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXPtoLevel = function (level, deltaNext) {
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    // parse by xp
    var parseByXP = function (xp, cap, deltaNext) {
        xp = xp === undefined ? DEFAULTS.xp : xp;
        cap = cap === undefined ? DEFAULTS.cap : cap;
        deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
        var l = set(xp, deltaNext);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXPtoLevel(level + 1, deltaNext);
        forNext = l === cap ? Infinity : forNext;
        var toNext = l === cap ? Infinity : forNext - xp;
        var forLast = getXPtoLevel(level, deltaNext);
        return {
            level: level,
            levelFrac: l,
            cap: cap,
            xp: xp,
            per: (xp - forLast) / (forNext - forLast),
            forNext: forNext,
            toNext: toNext,
            forLast: forLast,
            valueOf: function () {
                return this.level;
            }
        };
    };

    // THE PUBIC API
    var api = {};

    // create a levelObj by passing a level value
    api.parseByLevel = function (l, cap, deltaNext) {
        l = l === undefined ? DEFAULTS.level : l;
        deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
        var xp = getXPtoLevel(l, deltaNext);
        return parseByXP(xp, cap, deltaNext);
    };

    // create a levelObj by passing an XP value
    api.parseByXP = parseByXP;

    // XP.applySkillPointes helpers and Public method
    var getSkillPointsPer = function (skillPoints) {
        var per = 1 - (1 / (skillPoints + 1));
        return utils.logPer(per, 2, 2.5);
    };
    api.applySkillPoints = function (levelObj, skillPoints, opt) {
        opt = opt || {};
        opt.SPEffectMax = opt.SPEffectMax === undefined ? 1000 : opt.SPEffectMax;
        opt.levelEffectMax = opt.levelEffectMax === undefined ? 250 : opt.levelEffectMax;
        opt.baseValue = opt.baseValue === undefined ? 0 : opt.baseValue;

        var level = levelObj.level,
        spPer = getSkillPointsPer(skillPoints),
        spValue = opt.SPEffectMax * spPer;
        levelValue = opt.levelEffectMax * utils.logPer((level / levelObj.cap), 2, 2),
        n = opt.baseValue + spValue + levelValue;

        return {
            levelObj: levelObj,
            opt: opt,
            levelValue: levelValue,
            spValue: spValue,
            baseValue: opt.baseValue,
            n: n,
            valueOf: function () {
                return this.n;
            }
        };
    };

    // return the public api to the XP global
    return api;
}
    ());
