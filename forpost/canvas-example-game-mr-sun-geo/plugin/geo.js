// geo.js plug-in
gameMod.load((function () {

        var tabulateObjectMass = function (obj) {

            var i = 0,
            len = Object.keys(obj.minerals).length,
            minKey,
            min,
            mass = 0;
            while (i < len) {
                minKey = Object.keys(obj.minerals)[i];
                min = obj.minerals[minKey];
                mass += min;
                i += 1;
            }
            return mass;
        };

        var setTotalMass = function (game) {
            var gd = game.geoData,
            i = 0,
            len = game.sections.length,
            mass,
            section;
            gd.totalMass = 0;
            while (i < len) {
                section = game.sections[i];
                section.totalMass = tabulateObjectMass(section);
                gd.totalMass += section.totalMass;
                i += 1;
            }
        };

        return {
            name: 'geo',
            callPriority: '2',
            create: function (game, opt) {
                game.geoData = {
                    totalMass: 0
                };
            },
            onDeltaYear: function (game, deltaYears) {

                setTotalMass(game);

            }
        };

    }
        ()));
