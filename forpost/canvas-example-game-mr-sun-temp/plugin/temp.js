gameMod.load({
    name: 'temp',
    callPriority: '1.0',
    create: function(game, opt){
        //game.maxTemp = 500;
        var td = game.sun.tempData = {
            i: 0,
            len: 100,
            base: 10,
            max: 500,
            years: 0,
            iAtYears: 100,
            temp: {},
            maxGroundTemp: 0
        };
        td.temp = utils.createLogPerObject(td.i, td.len, td.base, td.max);
        td.maxGroundTemp = 10;
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
        td.years += deltaYears;
        //td.i += deltaYears;
        td.i = Math.floor(td.years / td.iAtYears);
        td.i = td.i >= td.len ? td.len - 1 : td.i;
        td.temp = utils.createLogPerObject(td.i, td.len, td.base, td.max);
        game.sun.temp = td.temp.valueOf();

        // update temp of sections
        var i = game.sections.length,
        section;
        while(i--){
            section = game.sections[i];
            // ground temp goes up when section.per >= 49
            if(Math.floor(section.per * 100) >= 49){
                section.groundTemp += game.sun.temp / 10 * section.per;
            }else{
                section.groundTemp -= section.groundTemp / 100;
            }
            section.groundTemp = section.groundTemp < 0.25 ? 0: section.groundTemp;
            section.groundTemp = section.groundTemp > td.maxGroundTemp? td.maxGroundTemp: section.groundTemp;
            section.temp = section.groundTemp + game.sun.temp / 2 * section.per;
        }
    }
});