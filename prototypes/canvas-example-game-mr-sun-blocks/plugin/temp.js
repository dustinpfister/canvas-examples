gameMod.load((function(){
    var MAX_SUN_TEMP = 500;
    // update sun temp
    var updateSun = function(game, deltaYears){
    };
    // update temp for sections
    var updateTempSections = function(game, deltaYears){
    };
    // plugObj for temp.js
    return {
        name: 'temp',
        callPriority: '1.2',
        create: function(game, opt){
            // update for first time
            updateSun(game, 0);
            // set section temp values
            game.forSections(function(section){
                section.temp = 0;
                section.groundTemp = 0;
            });
        },
        onDeltaYear: function(game, deltaYears){
            updateSun(game, deltaYears);
            updateTempSections(game, deltaYears);
        }
    };
}()));