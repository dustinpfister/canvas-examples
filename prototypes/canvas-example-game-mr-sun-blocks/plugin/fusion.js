// fusion.js
gameMod.load((function(){

    // helper for creating a delta value for mineral production
    var getMinDelta = function(sun, rate, temp, deltaYears){
        return rate * Math.floor(sun.temp / temp) * deltaYears;
    };

    // create a minerals object
    var createMineralsObj = function(){
        return {
            hydrogen: 0, 
            carbon: 0,
            oxygen: 0
        };
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
        },
        onDeltaYear: function(game, deltaYears){
/*
            var sun = game.sun;

            // fusion happens in the sun
            if(sun.state === 'alive'){
                if(sun.temp >= 10){
                    sun.minerals.iron += getMinDelta(sun, 1, 10, deltaYears);
                }
                if(sun.temp >= 25){
                    sun.minerals.copper += getMinDelta(sun, 0.5, 25, deltaYears);
                }
                // transfer to sections
                var i = game.sections.length,
                section;
                while(i--){
                    section = game.sections[i];
                    if(section.per > 0.95){
                       Object.keys(sun.minerals).forEach(function(minKey){
                           var minCount = sun.minerals[minKey];
                           var transferAmount = 1 * deltaYears;
                           if(minCount >= transferAmount){
                               section.minerals[minKey] += transferAmount;
                               sun.minerals[minKey] -= transferAmount;
                           }
                       });
                    }
                }
            }

            if(sun.state === 'explode'){
                Object.keys(sun.minerals).forEach(function(minKey){
                    var minCount = sun.minerals[minKey],
                    i = game.sections.length,
                    section;
                    if(minCount > 0){
                        while(i--){
                            section = game.sections[i];
                            section.minerals[minKey] += Math.floor(minCount / game.sections.length * section.per);
                        }
                        sun.minerals[minKey] = 0;
                    }
                });
            }
*/
        }
    };
}()));