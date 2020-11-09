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
        // transfer water between atmo objects
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
        // rain water down back to the section water object
        var rain = function (section) {
            var roll = Math.random(),
            delta,
            secAtmo = section.atmo;
            if (secAtmo.water.rainCount === 0) {
                if (roll < secAtmo.water.rainPer) {
                    secAtmo.water.rainCount = Math.round(secAtmo.water.rainCountMax * Math.random());
                }
            }
            if (secAtmo.water.amount >= 1 && secAtmo.water.rainCount > 0) {
                delta = Math.floor(secAtmo.water.amount * 0.50);
                delta = delta > 1 ? delta : 1;
                secAtmo.water.amount -= delta;
                section.water.amount += delta;
                secAtmo.water.rainCount -= 1;
            }
        };
        // update section objects
        var updateSectionValues = function (game, deltaYears) {
            var hd = game.hydroData,
            i = 0,
            len = game.sections.length,
            section,
            highAtmoWaterAmount = Math.max.apply(null, game.sections.map(function (section) {
                        return section.atmo.water.amount;
                    }));
            while (i < len) {
                section = game.sections[i];

                // water evaporation, transfer, and rain
                evaporation(section);
                transferAtmo(game, section);
                rain(section);

                //!!! this is not working the way it should
                section.atmo.water.per = section.atmo.water.amount / (highAtmoWaterAmount || 1);
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
                            //rain: false,
                            rainPer: 0.25,
                            rainCount: 0,
                            rainCountMax: 10,
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
