// drafting out upgrade cost

var upgradeData = [{
        dispName: 'Manual Gather',
        cost: {
            base: 10,
            pow: 1.09,
            inc: 5
        }
    }
];

// make a new upgradeState object from an upgradeData object
var makeUS = function (ud) {
    return {
        dispName: ud.dispName,
        level: 0,
        cost: Object.assign({
            current: ud.cost
        }, ud.cost)
    };
};

// get the breakdown for base, inc, and pow that sets current cost
var getUSCostBreakdown = function (us) {
    return {
        base: us.cost.base,
        inc: us.cost.inc * us.level,
        pow: Math.floor(Math.pow(us.cost.pow, us.level))
    };
};

// set the given upgrade state to the given level
var setUSCurrentCost = function (us, level) {
    var bd;
    level = level || 0;
    us.level = level;
    var bd = getUSCostBreakdown(us);
    us.cost.current = bd.base + bd.inc + bd.pow;
};

var u = makeUS(upgradeData[0]);
console.log(u);
var level = 0,
bd,
len = 100;
while (level < len) {
    setUSCurrentCost(u, level);
    bd = getUSCostBreakdown(u);
    console.log(level, u.cost.current, bd.base, bd.inc, bd.pow);
    level += 1;
}
