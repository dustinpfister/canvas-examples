var XP = (function () {
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

    var parseByXP = function (xp) {
        var l = set(xp),
        level = Math.floor(l),
        forNext = XPto(level + 1);
        return {
            level: level,
            levelFrac: l,
            xp: xp,
            forNext: forNext,
            toNext: forNext - xp
        };
    };

    return {
        parseByLevel: function (l) {
            return parseByXP(XPto(l));
        },
        parseByXP: parseByXP
    };
}
    ());

var obj = XP.parseByXP(750);
console.log(obj);

obj = XP.parseByLevel(6);
console.log(obj);
