// atmo.js plug-in
gameMod.load((function () {

        // update section objects
        var updateSectionValues = function (game, deltaYears) {
            var hd = game.hydroData,
            i = 0,
            len = game.sections.length,
            section;
            while (i < len) {
                section = game.sections[i];
                // transfer water from water object to atmo object
                if (section.water.evaporation > 0.10 && section.water.amount >= 1) {
                    section.atmo.water.amount += 1;
                    section.water.amount -= 1;
                }
                section.atmo.water.per = section.atmo.water.amount / hd.water.total;
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
                game.atmoData = {};
                // set defaults for section.water
                game.sections.forEach(function (section) {
                    section.atmo = {
                        water: {
                            amount: 0,
                            per: 0
                        }
                    };
                });
            },
            onDeltaYear: function (game, deltaYears) {
                updateSectionValues(game, deltaYears);
            }
        };

    }
        ()));
