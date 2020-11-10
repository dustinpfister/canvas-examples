// sun.js plug-in
// append advanced properties to the sun
// object made with gameMod.create
gameMod.load({
    name: 'sun',
    callPriority: '1.1',
    create: function(game, opt){
        console.log(this.name);
        var sun = game.sun;

        game.addPoints = function(points){
            sun.points += 1;
        };

        game.resetSun = function(){
            sun.points = 0;
            sun.years = 0;
            sun.exp = 0;
            sun.levelObj = {};
        };
        game.resetSun();
    },
    onDeltaYear: function(game, deltaYears){
        var sun = game.sun;
        sun.years += deltaYears;
        sun.exp = sun.years + sun.points;
        //sun.levelObj = utils.createLogPerObject(, td.len, td.base, td.max);
    }
});