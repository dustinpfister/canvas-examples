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
            xp: xp,
            per: (xp - forLast) / (forNext - forLast),
            forNext: forNext,
            toNext: toNext,
            forLast: forLast
        };
    };
    return {
        parseByLevel: function (l, cap, deltaNext) {
            l = l === undefined ? DEFAULTS.level : l;
            deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
            var xp = getXPtoLevel(l, deltaNext);
            console.log(xp);
            return parseByXP(xp, cap, deltaNext);
        },
        parseByXP: parseByXP
    };
}
    ());
