// MAIN file including state machine
(function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    var sm = {
        canvas: canvas,
        ctx: ctx,
        game: gameMod.create({
            canvas: canvas
        }),
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };

    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos;
            sm.input.pointerDown = true;
            console.log('start');
        },
        move: function (sm, e) {
            console.log('move');
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
            console.log('end');
        }
    };

    var createPointerHandler = function (sm, type) {
        return function (e) {
            sm.input.pos = utils.getCanvasRelative(e);
            pointerHanders[type](sm, e);
        };
    };

    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));

    var lt = new Date(),
    FPS_target = 30;
    var loop = function () {
        var now = new Date(),
        t = now - lt,
        secs = t / 1000;
        requestAnimationFrame(loop);
        if (t >= 1000 / FPS_target) {
            gameMod.update(sm.game, secs);
            draw.back(ctx, canvas);
            draw.map(ctx, sm.game.map, sm.game.cross);
            draw.explosions(ctx, sm.game);
            draw.cross(ctx, sm.game.cross);
            draw.shots(ctx, sm.game);
            draw.buttons(ctx);
            draw.ver(ctx, sm.game);
            //draw.statBar(ctx, sm.game);
            //draw.info(ctx, sm.game);
            draw.debugAutoPlay(ctx, sm.game);
            lt = now;
        }
    };

    loop();

}
    ());
