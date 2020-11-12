var stateMod.load({
    name: 'ui-sun',
    init: function (sm) {
        // setup sun object
        sm.game = gameMod.create({
            canvas: sm.canvas,
            sectionCount: 19,
            worldRadius: 100,
            yearRate: 0.25,
            year: 0
        });
    },
    // for each update tick
    update: function (sm, secs) {
        gameMod.update(sm.game, secs);
        draw.back(sm);
        draw.sections(sm);
        draw.sun(sm);
        draw.disp(sm);
        draw.ver(sm);
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
                changeState(sm, 'observe_section', {
                    section: section
                });
            }
            // if sun click
            if (utils.distance(sm.game.sun.x, sm.game.sun.y, pos.x, pos.y) <= sm.game.sun.radius) {
                changeState(sm, 'observe_sun', {});
            }
        }
    }
});
