var game = (function () {

    // UPGRADES

    // upgrade data array
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
        }, {
            dispName: 'Auto Gather',
            cost: {
                base: 1000,
                pow: 1.25,
                inc: 250
            },
            effect: function (state, level, us) {

                state.autoGatherActive = false;
                if (level >= 1) {
                    state.autoGatherActive = true;
                    state.gatherRate.auto = level + Math.floor(Math.pow(1.025, level) - 1);;
                }

            }
        }
    ];

    // make a new upgradeState object from an upgradeData object
    var makeUS = function (ud) {
        return {
            dispName: ud.dispName,
            ud: ud,
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
        ud.effect(state, us.level, us);
    };

    // set the upgrade level
    var setUpgradeLevel = function (us, state, level) {
        setUSCurrentCost(us, level);
        applyUSEffectToState(us, state, us.ud);
    };

    // apply all the current states of a state
    var applyAllUSFromState = function (state, upgradeData) {
        state.US.forEach(function (us, i) {
            setUpgradeLevel(us, state, us.level);
        });
    };

    // GAME STATE OBJECT CREATE

    // create and return a new game save state with the given upgradeData
    var createNewState = function (upgradeData) {
        return {
            money: 0,
            tickRate: 3000,
            lastTick: new Date(),
            autoGatherActive: false,
            gatherRate: {
                manual: 1,
                auto: 0
            },
            // just set zero for each upgrade
            US: upgradeData.map(function (ud) {
                return makeUS(ud);
            })
        };
    };

    return {

        // return the state object to use
        getState: function () {
            var state = createNewState(upgradeData);
            applyAllUSFromState(state, upgradeData);
            return state;
        },

        // buy the nest upgrade for the given upgrade
        buyUpgrade: function (state, usi) {

            usi = typeof usi === 'number' ? state.US[usi] : usi;

            if (state.money >= usi.cost.current) {
                state.money -= usi.cost.current;
                setUpgradeLevel(usi, state, usi.level += 1);
            }
        },

        // a manual gather action has happened to the given state
        manualGather: function (state) {
            state.money += state.gatherRate.manual;
        },

        // I would like to update the given state
        update: function (state) {
            var now = new Date(),
            t = now - state.lastTick,
            ticks = t / state.tickRate;
            if (state.autoGatherActive) {
                if (ticks >= 1) {
                    state.money += state.gatherRate.auto * ticks;
                    state.lastTick = now;
                }
            } else {
                state.lastTick = now;
            }
        }

    };

}
    ());
