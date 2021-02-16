(function () {


    var canvasObj = utils.createCanvas();
    var canvas = canvasObj.canvas;
    var ctx = canvasObj.ctx;

    var sm = {
        ver: '0.2.0',
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
            var pos = sm.input.pos;
            sm.input.pointerDown = true;

            var cell = mapMod.getCellByPointer(sm.game.maps[sm.game.mapIndex], pos.x, pos.y);

            if (cell) {
                sm.game.targetCell = cell;
            }

        },
        move: function (sm, e) {},
        end: function (sm, e) {
            sm.input.pointerDown = false;
            loop();
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
        //requestAnimationFrame(loop);

        gameMod.update(sm.game);

        draw.back(sm);
        draw.map(sm);
        draw.info(sm);
    };

    loop();

}
    ());
