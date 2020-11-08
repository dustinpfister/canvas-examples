// hydro.js plug-in
gameMod.load((function () {
        
        var updateSectionValues = function (game, deltaYears) {
            var hd = game.hydroData,
            i = 0,
            len = game.sections.length,
            section;
            while (i < len) {
                section = game.sections[i];
                i += 1;
            }
        };
        // distribute total water to world sections
        var distributeWater = function(game){
            var hd = game.hydroData;
            var perSection = Math.floor(hd.water.total / game.sections.length),
            oddWater = hd.water.total % game.sections.length;
            game.sections.forEach(function(section){
                section.water.amount = perSection;
            });
            game.sections[0].water.amount += oddWater;
        };
        // plugObj for hydro.js
        return {
            name: 'hydro',
            callPriority: '2.1',
            create: function (game, opt) {
                console.log(this.name);
                // create hydroData Object
                game.hydroData = {
                    water:{
                        total : 1000
                    }
                };
                // set defaults for section.water
                game.sections.forEach(function(section){
                    section.water = {
                        amount: 0,
                        per: 0
                    };
                });
                distributeWater(game);
            },
            onDeltaYear: function (game, deltaYears) {
            }
        };

    }
        ()));
