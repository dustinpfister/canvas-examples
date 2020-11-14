gameMod.load((function(){
    var MAX_SUN_TEMP = 250,
    MAX_GROUND_TEMP = 1000;
    // update sun temp
    var updateSun = function(game, deltaYears){
    };
    // update temp for sections
    var updateTempSections = function(game, deltaYears){
        game.forSections(function(section){
            section.temp = section.per * MAX_SUN_TEMP;
            section.temp = Number(section.temp.toFixed(2));
        });
    };
    // plugObj for temp.js
    return {
        name: 'temp',
        callPriority: '1.2',
        create: function(game, opt){
            // update for first time
            updateSun(game, 0);
            game.sun.temp = MAX_SUN_TEMP;
            // set section temp values
            game.forSections(function(section){
                section.temp = 0;
                section.groundTemp = MAX_GROUND_TEMP;
            });
        },
        onDeltaYear: function(game, deltaYears){
            updateSun(game, deltaYears);
            updateTempSections(game, deltaYears);
        }
    };
}()));