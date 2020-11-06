// fusion.js
gameMod.load((function(){

    // helper for creating a delta value for mineral production
    var getMinDelta = function(section, rate, temp, deltaYears){
        return rate * Math.floor(section.temp / temp) * deltaYears;
    };

    // the plugObj for fusion
    return {
        name: 'fusion',
        callPriority: '1.1',
        create: function(game, opt){

            /*
            game.sections = game.sections.map(function(section){
                section.minerals = {
                    copper: 0, 
                    silver: 0 
                };
                return section;
            });
            */
            game.sun.minerals = {
                copper: 0, 
                silver: 0 
            };

        },
        onDeltaYear: function(game, deltaYears){
            var i = game.sections.length,
            section;
            while(i--){
                section = game.sections[i];
                if(section.temp > 100){
                    section.minerals.copper += getMinDelta(section, 5, 100, deltaYears);
                }
                if(section.temp > 250){
                    section.minerals.silver += getMinDelta(section, 1, 250, deltaYears);
                }
            }
        }
    };
}()));