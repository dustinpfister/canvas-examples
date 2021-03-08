var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
// state machine object
var sm = {
    ver: '0.0.1',
    currentState: 'init',
    canvas: canvas,
    ctx: ctx,
    backgroundStyle:'gray',
    model: {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: 10
    },
    init: {
        tick: function (model, sm) {
            PMMT(sm);
            sm.currentState = 'demo';
        }
    },
    demo: {
        tick: function (model, sm) {

            draw.background(sm.ctx, sm.canvas, sm);
            draw.pointerObj(sm.ctx, sm.canvas, sm.model);
            draw.ver(sm.ctx, sm.canvas, sm);

        },
        pointer: {
            start: function (pos, sm, e) {
                sm.model.down = true;
            },
            move: function (pos, sm, e) {
                var m = sm.model;
                if (m.down) {
                    m.x = pos.x;
                    m.y = pos.y;
                }
            },
            end: function () {
                var m = sm.model;
                m.down = false;
                m.x = canvas.width / 2,
                m.y = canvas.height / 2
            }
        }
    }
};
// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    sm[sm.currentState].tick(sm.model, sm);
};
loop();
