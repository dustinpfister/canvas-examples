// atmo.js plug-in
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
        // plugObj for hydro.js
        return {
            name: 'atmo',
            callPriority: '2.2',
            create: function (game, opt) {
                console.log(this.name);
                // create hydroData Object
                game.atmoData = {
                    water:{
                        amount : 1000
                    }
                };
                // set defaults for section.water
                game.sections.forEach(function(section){
                    section.atmo = {
                        water: {
                            amount: 0
                        }
                    };
                });
            },
            onDeltaYear: function (game, deltaYears) {
                // updateSectionValues(game, deltaYears);
            }
        };

    }
        ()));
