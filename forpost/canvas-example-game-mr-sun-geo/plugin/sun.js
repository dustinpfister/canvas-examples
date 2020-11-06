// sun.js plug-in
// append advanced properties to the sun
// object made with gameMod.create
gameMod.load({
    name: 'sun',
    callPriority: '0',
    create: function(game, opt){
        var sun = game.sun;
        sun.state = 'dead';
        sun.spawnRate = 20;
        sun.deadYears = 0;
        sun.toAlivePer = 0;
        sun.lifeSpan = 0;
    },
    onDeltaYear: function(game, deltaYears){
        var sun = game.sun;
        if(sun.state === 'explode'){
            sun.deadYears = 0;
            sun.toAlivePer = 0;
            sun.state = 'dead';
        }
        if(sun.state === 'dead'){
            sun.deadYears += deltaYears;
            sun.deadYears = sun.deadYears > sun.spawnRate ? sun.spawnRate: sun.deadYears;
            sun.toAlivePer = sun.deadYears / sun.spawnRate;
            if(sun.toAlivePer >= 1){
                sun.state = 'alive';
                sun.lifeSpan = 1000;
            }
        }
        if(sun.state === 'alive'){
            sun.lifeSpan -= deltaYears;
            sun.lifeSpan = sun.lifeSpan < 0 ? 0 : sun.lifeSpan;
            if(sun.lifeSpan === 0){
                sun.state = 'explode';
            }
        }
    }
});