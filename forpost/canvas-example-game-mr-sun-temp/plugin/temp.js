gameMod.load({
    name: 'temp',
    callPriority: '1.0',
    create: function(game, opt){
        // create tempData object
        var td = game.tempData = {
            i: 0,
            len: 100,
            base: 10,
            max: 500,
            years: 0,
            iAtYears: 100,
            temp: {},
            globalMaxGroundTemp: 0
        };
        td.temp = utils.createLogPerObject(td.i, td.len, td.base, td.max);
        td.globalMaxGroundTemp = 10;
        game.sun.temp = td.temp.valueOf();
        game.sections = game.sections.map(function(section){
            section.temp = 0;
            section.groundTemp = 0;
            return section;
        });
    },
    onDeltaYear: function(game, deltaYears){

        // sun will gain temp over time
        var td = game.tempData;
        td.years += deltaYears;
        td.i = Math.floor(td.years / td.iAtYears);
        td.i = td.i >= td.len ? td.len - 1 : td.i;
        td.temp = utils.createLogPerObject(td.i, td.len, td.base, td.max);

        // SET SUN TEMP
        game.sun.temp = td.temp.valueOf();

        // I think globalMaxGroundTemp should not be fixed, but should also not be the same as the sun
        // something crude like just dividing by 10 might work for now.
        td.globalMaxGroundTemp = game.sun.temp / 10;

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
            // section max ground temp set by section.per and global max ground temp value
            section.maxGroundTemp = td.globalMaxGroundTemp * section.per;
            section.groundTemp = section.groundTemp < 0.25 ? 0: section.groundTemp;
            section.groundTemp = section.groundTemp > section.maxGroundTemp ? section.maxGroundTemp: section.groundTemp;

            // SET SECTION TEMP
            section.temp = section.groundTemp + game.sun.temp * section.per;

        }
    }
});