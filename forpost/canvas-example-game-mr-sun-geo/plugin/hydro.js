// hydro.js plug-in
gameMod.load((function () {
        
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
        // transfer water from one section to another based on elevation
        var transferElevation = function(game, section){
             var len = game.sections.length;
             var n1 = game.sections[utils.mod(section.i - 1, len)];
             var n2 = game.sections[utils.mod(section.i + 1, len)];


             if(section.elevation.total + section.water.amount > (n1.elevation.total + n1.water.amount) && section.water.amount >= 1){
                 section.water.amount -= 1;
                 n1.water.amount += 1;
             }
             if(section.elevation.total + section.water.amount > (n2.elevation.total + n2.water.amount) && section.water.amount >= 1){
                 section.water.amount -= 1;
                 n2.water.amount += 1;
             }

        };
        var updateSectionValues = function (game, deltaYears) {
            var hd = game.hydroData,
            i = 0,
            len = game.sections.length,
            section;
            while (i < len) {
                section = game.sections[i];
                transferElevation(game, section);
                i += 1;
            }
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
                updateSectionValues(game, deltaYears);
            }
        };

    }
        ()));
