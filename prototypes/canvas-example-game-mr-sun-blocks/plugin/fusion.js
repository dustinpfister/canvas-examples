// fusion.js
gameMod.load((function(){

    var SUN_STARTING_HYDROGEN = 100000,
    SUN_MINERAL_PRODUCTION = {
        carbon: {
            rate: 5,     // the amount of the mineral
            temp: 100,   // min temp required
            cost: {      // the cost to produce
                amount: 1,
                mineral: 'hydrogen'
            }
        },
        oxygen: {
            rate: 1,
            temp: 250,
            cost: {
                amount: 1,
                mineral: 'carbon'
            }
        }
    },
    SUN_MINERAL_TRANSFER_RATES = { // transfer rates per year from sun to section
        hydrogen: 7,
        carbon: 5,
        oxygen: 1
    };


    // helper for creating a delta value for mineral production
    var getMinDelta = function(sun, rate, temp, deltaYears){
        return rate * Math.floor(sun.temp / temp) * deltaYears;
    };
    var getMinCost = function(sun, production, deltaYears){
        return Math.floor(production.cost.amount * deltaYears);
    };

    // create a minerals object
    var createMineralsObj = function(){
        return {
            hydrogen: 0, 
            carbon: 0,
            oxygen: 0
        };
    };
    // create heavy minerals from lighter ones
    var createMinerals = function(sun, deltaYears){
        var i = 0,
        minName,
        minCount,
        production,
        keys = Object.keys(sun.minerals),
        len = keys.length; 
        while(i < len){
            minName = keys[i];
            minCount = sun.minerals[minName];
            production = SUN_MINERAL_PRODUCTION[minName];
            if(production){
                if(sun.temp >= production.temp){
                    var delta = getMinDelta(sun, production.rate, production.temp, deltaYears),
                    cost = getMinCost(sun, production, deltaYears);
                    if(sun.minerals[production.cost.mineral] >= cost){
                        sun.minerals[production.cost.mineral] -= cost;
                        sun.minerals[minName] += delta
                    }
                }
            }
            i += 1;
        }
    };
    // transfer minerals to a section that is close
    var transferToSection = function(sun, section, deltaYears){
        if(section.per > 0.95){
            Object.keys(sun.minerals).forEach(function(minKey){
                var minCount = sun.minerals[minKey];
                var transferAmount = SUN_MINERAL_TRANSFER_RATES[minKey] * deltaYears;
                if(minCount >= transferAmount){
                    section.minerals[minKey] += transferAmount;
                    sun.minerals[minKey] -= transferAmount;
                }
            });
        }
    };

    // the plugObj for fusion
    return {
        name: 'fusion',
        callPriority: '1.3',
        create: function(game, opt){
            // minerals object for the sun
            game.sun.minerals = createMineralsObj();
            // minerals objects for each section
            game.forSections(function(section){
                section.minerals = createMineralsObj();
            });
            // starting hydrogen for sun
            game.sun.minerals.hydrogen = SUN_STARTING_HYDROGEN;
        },
        onDeltaYear: function(game, deltaYears){

            var sun = game.sun;
            createMinerals(sun, deltaYears);

            game.forSections(function(section){
                transferToSection(sun, section, deltaYears);
            });
        }
    };
}()));