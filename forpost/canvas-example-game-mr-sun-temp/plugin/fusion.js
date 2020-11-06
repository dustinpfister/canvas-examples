// fusion.js
gameMod.load((function(){

    // helper for creating a delta value for mineral production
    var getMinDelta = function(sun, rate, temp, deltaYears){
        return rate * Math.floor(sun.temp / temp) * deltaYears;
    };

    // the plugObj for fusion
    return {
        name: 'fusion',
        callPriority: '1.1',
        create: function(game, opt){
            game.sun.minerals = {
                copper: 0, 
                iron: 0 
            };

        },
        onDeltaYear: function(game, deltaYears){
            sun = game.sun;
            if(sun.temp >= 10){
                sun.minerals.iron += getMinDelta(sun, 1, 10, deltaYears);
            }
            if(sun.temp >= 25){
                sun.minerals.copper += getMinDelta(sun, 0.5, 25, deltaYears);
            }
/*
            var i = game.sections.length,
            section;
            while(i--){
                section = game.sections[i];
                if(section.temp > 10){
                    section.minerals.copper += getMinDelta(section, 5, 100, deltaYears);
                }
                if(section.temp > 25){
                    section.minerals.silver += getMinDelta(section, 1, 250, deltaYears);
                }
            }
*/
        }
    };
}()));