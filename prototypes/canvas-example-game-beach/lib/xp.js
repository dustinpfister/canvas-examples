var XP = (function () {

    // set level with given xp
    var set = function (xp) {
        return Math.sqrt(xp);
    };
    // get exp to the given level with given current_level and xp
    var XPto = function (level) {
        return Math.pow(level, 2);
    };

    return {
        set: set,
        XPto: XPto,
        parse: function (xp) {

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

        },

    };

}
    ());

var xp = XP.XPto(10);
console.log(XP.set(xp)); // level 10
console.log(xp); // 100 XP

var obj = XP.parse(169);

console.log(obj);
