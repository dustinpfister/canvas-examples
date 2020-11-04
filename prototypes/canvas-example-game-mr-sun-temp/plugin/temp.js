gameMod.load({
    name: 'temp',
    callPriority: '1.0',
    create: function(game, opt){
        console.log(this.name);
        game.sun.temp = 0;
        game.sections = game.sections.map((section)=>{
            section.temp = 0;
            section.groundTemp = 0;
            return section;
        });
    },
    onDeltaYear: function(game, deltaYears){
        // sun will gain temp over time
        game.sun.temp = 10 + 10 * game.year;
        game.sun.temp = game.sun.temp > 10000 ? 10000: game.sun.temp;
        // update temp of sections
        var i = game.sections.length,
        section;
        while(i--){
            section = game.sections[i];
            if(Number(section.per.toFixed(2)) >= 0.5){
                section.groundTemp += game.sun.temp / 10 * section.per;
            }else{
                section.groundTemp -= section.groundTemp / 100;
            }
            section.groundTemp = section.groundTemp < 0 ? 0: section.groundTemp;
            section.groundTemp = section.groundTemp > 1000 ? 1000: section.groundTemp;
            section.temp = section.groundTemp + 1000 * section.per;
        }
        console.log('sun temp: ' + game.sun.temp);
    }
});