stateMod.load({
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
        // draw background method
        sm.draw.back = function(sm){
            sm.ctx.fillStyle = '#202020';
            sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
        };
        sm.draw.sections = function (sm) {
            var ctx = sm.ctx;
            sm.game.sections.forEach(function (section) {
                var b = 50 + Math.round(section.per * 128);
                ctx.fillStyle = 'rgb(0,0,' + b + ')';
                ctx.beginPath();
                ctx.arc(section.x, section.y, section.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '10px arial';
                ctx.fillText(section.cookie.count, section.x, section.y);
                //ctx.fillText(section.energy, section.x, section.y);
            });
        };
        sm.draw.sun = function (sm) {
            var sun = sm.game.sun,
            ctx = sm.ctx;
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.fillText(sm.game.jar.count, sun.x, sun.y);
        };
        // display
        sm.draw.disp = function (sm) {
            var ctx = sm.ctx;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.fillText('year: ' + sm.game.year, 3, 10);
            ctx.fillText('sun exp: ' + sm.game.sun.xp, 3, 20);
            ctx.fillText('sun level: ' + sm.game.sun.levelObj.level, 3, 30);
        };
        // draw version number
       sm.draw.ver = function (sm) {
            var ctx = sm.ctx;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.fillText('v' + sm.ver, 10, sm.canvas.height - 15);
        };
    },
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
