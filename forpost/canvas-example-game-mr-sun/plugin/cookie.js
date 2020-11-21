gameMod.load({
    name: 'cookie',
    callPriority: 2.1,
    create: function(game, opt){
        console.log(this.name);
        game.forSections(function(section){
            section.cookie = {
                count: 0,
                rate: 1,
                max: 10
            };
        });
    },
    onDeltaYear: function(game, deltaYears){
        game.forSections(function(section){
            var cookie = section.cookie;
            cookie.count += cookie.rate * deltaYears;
            cookie.count = cookie.count > cookie.max ? cookie.max : cookie.count;
            section.text = cookie.count + '/' + cookie.max;
        });
    }
});