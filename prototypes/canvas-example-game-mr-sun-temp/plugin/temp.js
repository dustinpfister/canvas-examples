gameMod.load({
    name: 'temp',
    callPriority: '1.0',
    create: function(game, opt){
        console.log(this.name);
        game.maxTemp = 2000;
        game.sun.temp = 0;
        game.sections = game.sections.map(function(section){
            section.temp = 0;
            section.groundTemp = 0;
            return section;
        });
    },
    onDeltaYear: function(game, deltaYears){
        // sun will gain temp over time
        game.sun.temp = 50 + (game.maxTemp - 50) * game.year / 100000;
        game.sun.temp = game.sun.temp > game.maxTemp ? game.maxTemp: game.sun.temp;
        // update temp of sections
        var i = game.sections.length,
        section;
        while(i--){
            section = game.sections[i];
            if(Math.floor(section.per * 100) >= 50){
                section.groundTemp += game.sun.temp / 10 * section.per;
            }else{
                section.groundTemp -= section.groundTemp / 100;
            }
            section.groundTemp = section.groundTemp < 0.25 ? 0: section.groundTemp;
            section.groundTemp = section.groundTemp > game.maxTemp / 2 ? game.maxTemp / 2: section.groundTemp;
            section.temp = section.groundTemp + game.sun.temp / 2 * section.per;
        }
    }
});