(function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    var sm = {
        game: gameMod.create(),
        canvas: canvas,
        ctx: ctx,
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
            sm.input.pointerDown = true;
        },
        move: function (sm, e) {
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
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

    var loop = function () {
        requestAnimationFrame(loop);
        draw.back(sm);
        draw.map(sm);
        draw.info(sm);
    };

    loop();

}
    ());
