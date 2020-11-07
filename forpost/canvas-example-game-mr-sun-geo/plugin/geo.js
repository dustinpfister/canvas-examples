// geo.js plug-in
gameMod.load((function () {
        // tabulate the mass of an object
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
        // set total mass by tabulating all sections
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
        // set massPer prop for all sections
        var updateSectionValues = function (game, deltaYears) {
            var gd = game.geoData,
            i = 0,
            len = game.sections.length,
            mass,
            section;
            while (i < len) {
                section = game.sections[i];
                section.massPer = 0;
                if (section.totalMass > 0) {
                    // set mass percentage
                    section.massPer = section.totalMass / gd.totalMass;
                    // set magmatism
                    section.magmatism = section.massPer * (section.groundTemp / game.tempData.globalMaxGroundTemp);
                    // elevation
                    
                    section.elevation.total = section.elevation.total + section.magmatism * deltaYears * gd.maxElevationPerYear;
                    section.elevation.total = section.elevation.total - section.erosion * deltaYears * gd.maxErosionPerYear;
                    // elevation bounds
                    section.elevation.total = section.elevation.total > gd.maxElevation ? gd.maxElevation: section.elevation.total;
                    section.elevation.total = section.elevation.total < 0 ? 0: section.elevation.total;
                }
                i += 1;
            }
        };
        return {
            name: 'geo',
            callPriority: '2',
            create: function (game, opt) {
                game.geoData = {
                    totalMass: 0,
                    maxElevation: 1000,
                    maxElevationPerYear: 10,
                    maxErosionPerYear: 1,
                    seaLevel: 0
                };
                var gd = game.geoData;

                game.sections.forEach(function(section){
                    section.totalMass = 0;
                    section.massPer = 0;
                    section.magmatism = 0;
                    section.erosion = 0.5;
                    //section.elevation = 0;
                    section.elevation = {
                        base: 0,
                        magma: 0,
                        total: 0
                    };
                });

            },
            onDeltaYear: function (game, deltaYears) {
                setTotalMass(game);
                updateSectionValues(game, deltaYears);
            }
        };

    }
        ()));
