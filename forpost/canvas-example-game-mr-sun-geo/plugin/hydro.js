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

        return {
            name: 'hydro',
            callPriority: '2.1',
            create: function (game, opt) {
                console.log(this.name);
                game.hydroData = {
                    water:{
                        total : 1000
                    }
                };
            },
            onDeltaYear: function (game, deltaYears) {
            }
        };

    }
        ()));
