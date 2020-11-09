// atmo.js plug-in
gameMod.load((function () {

        // evaporation
        var evaporation = function (section) {
            // transfer water from water object to atmo object
            if (section.water.evaporation > 0.10 && section.water.amount >= 1) {
                section.atmo.water.amount += 1;
                section.water.amount -= 1;
            }
        };

        var transferAtmo = function (game, section) {
            var len = game.sections.length,
            n1 = game.sections[utils.mod(section.i - 1, len)],
            n2 = game.sections[utils.mod(section.i + 1, len)];

            if (section.atmo.water.amount > n1.atmo.water.amount && section.atmo.water.amount >= 1) {
                section.atmo.water.amount -= 1;
                n1.atmo.water.amount += 1;
            }
            if (section.atmo.water.amount > n2.atmo.water.amount && section.atmo.water.amount >= 1) {
                section.atmo.water.amount -= 1;
                n2.atmo.water.amount += 1;
            }

        };

        // update section objects
        var updateSectionValues = function (game, deltaYears) {
            var hd = game.hydroData,
            i = 0,
            len = game.sections.length,
            section;
            while (i < len) {
                section = game.sections[i];

                evaporation(section);
                transferAtmo(game, section);

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
