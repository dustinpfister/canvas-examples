stateMod.load({
    name: 'ui-sun',
    // init method for the game state
    init: function(sm){
        var sun = sm.game.sun;
        sun.move = function(game, pos){
            var radius = game.worldRadius - game.sectionRadius;
            if(utils.distance(pos.x, pos.y, game.centerX, game.centerY) < radius){
                gameMod.moveSun(game, pos);
            }
        };
    },
    // update and draw
    update: function (sm, secs) {
        gameMod.update(sm.game, secs);
    },
    draw: function(d, ctx, canvas, game, sm){
        d.back(sm);
        d.sections(sm);
        d.sun(sm);
        d.disp(sm);
        d.ver(sm);
    },
    pointer : {
        start: function (sm, pos, e) {
            sm.game.sun.move(sm.game, pos);
        },
        move: function (sm, pos, e) {
            if (sm.input.pointerDown) {
                sm.game.sun.move(sm.game, pos);
            }
        },
        end: function(){}
    }
});
