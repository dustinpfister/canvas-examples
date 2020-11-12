stateMod.load({
    name: 'ui-sun',
    // for each update tick
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
    // events
    pointerStart: function (sm, pos, e) {},
    pointerMove: function (sm, pos, e) {
        var sun = sm.game.sun;
        if (sm.input.pointerDown) {
            gameMod.moveSun(sm.game, pos);
        }
    },
    pointerEnd: function (sm, pos) {
        if (sm.input.d < 3) {
            // if section click
            var section = gameMod.getSectionByPos(sm.game, pos.x, pos.y);
            if (section) {
                //changeState(sm, 'observe_section', {
                //    section: section
                //});
            }
            // if sun click
            if (utils.distance(sm.game.sun.x, sm.game.sun.y, pos.x, pos.y) <= sm.game.sun.radius) {
                //changeState(sm, 'observe_sun', {});
            }
        }
    }
});
