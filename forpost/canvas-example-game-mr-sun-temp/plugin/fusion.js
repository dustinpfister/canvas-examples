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
            // minerals object for the sun
            game.sun.minerals = {
                copper: 0, 
                iron: 0 
            };
            // minerals objects for each section
            var i = game.sections.length,
            section;
            while(i--){
                section = game.sections[i];
                section.minerals = {
                   copper: 0, 
                   iron: 0 
                }
            }
        },
        onDeltaYear: function(game, deltaYears){
            sun = game.sun;
            if(sun.temp >= 10){
                sun.minerals.iron += getMinDelta(sun, 1, 10, deltaYears);
            }
            if(sun.temp >= 25){
                sun.minerals.copper += getMinDelta(sun, 0.5, 25, deltaYears);
            }

            var i = game.sections.length,
            section;
            while(i--){
                section = game.sections[i];
                if(section.per > 95){
                   
                }
            }

        }
    };
}()));