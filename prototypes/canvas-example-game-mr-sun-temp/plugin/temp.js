gameMod.load({
    name: 'temp',
    callPriority: '1.0',
    create: function(game, opt){
        game.maxTemp = 2000;
        var td = game.sun.tempData = {
            i: 0,
            len: 100,
            base: 100,
            max: 2000,
            temp: {}
        };
        td.temp = utils.createLogPerObject(td.i, td.len, td.base, td.max);
        game.sun.temp = td.temp.valueOf();
        game.sections = game.sections.map(function(section){
            section.temp = 0;
            section.groundTemp = 0;
            return section;
        });
    },
    onDeltaYear: function(game, deltaYears){
        // sun will gain temp over time
        var td = game.sun.tempData;
        td.i += deltaYears;
        td.i = td.i >= td.len ? td.len - 1 : td.i;
        td.temp = utils.createLogPerObject(td.i, td.len, td.base, td.max);
        game.sun.temp = td.temp.valueOf();

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