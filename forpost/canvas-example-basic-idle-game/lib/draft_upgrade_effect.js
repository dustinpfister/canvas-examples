// drafting out upgrade cost

var upgradeData = [{
        dispName: 'Manual Gather',
        cost: {
            base: 10,
            pow: 1.09,
            inc: 5
        },
        effect: function (state, level) {
            state.gatherRate.manual = 1 + level + Math.floor(Math.pow(1.05, level) - 1);
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

// apply the effect of an upgrade
var applyUSEffectToState = function (us, state, ud) {
    ud.effect(state, us.level);
};

// set the upgrade level
var setUpgradeLevel = function (us, state, ud, level) {
    setUSCurrentCost(us, level);
    applyUSEffectToState(us, state, ud);
};

var createNewState = function () {
    return {
        money: 0,
        tickRate: 3000,
        lastTick: new Date(),
        gatherRate: {
            manual: 1,
            auto: 0
        }
    };
};

var state = createNewState();
var ud = upgradeData[0];
var us = makeUS(ud);

setUpgradeLevel(us, state, ud, 100);

console.log(us);
console.log(state);
