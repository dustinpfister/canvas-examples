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
        d.sunMineralInfo(sm, 3, 30);
        d.ver(sm);
    },
    // events
    pointerStart: function (sm, pos, e) {
        sm.game.sun.move(sm.game, pos);
    },
    pointerMove: function (sm, pos, e) {
        if (sm.input.pointerDown) {
            sm.game.sun.move(sm.game, pos);
        }
    },
    pointerEnd: function (sm, pos) {
        if (sm.input.d < 3) {
            // if section click
            var section = gameMod.getSectionByPos(sm.game, pos.x, pos.y);
            if (section) {

                sm.game.setSection(section.i);
                sm.currentState = 'ui-blocks';
            }
            // if sun click
            if (utils.distance(sm.game.sun.x, sm.game.sun.y, pos.x, pos.y) <= sm.game.sun.radius) {
                //
            }
        }
    }
});
