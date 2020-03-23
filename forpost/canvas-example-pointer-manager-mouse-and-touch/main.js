
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var sm = {
    currentState: 'init',
    canvas: canvas,
    ctx: ctx,
    model: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    init: {
        tick: function (model, sm) {
            PMMT(sm);
            sm.currentState = 'demo';
        }
    },
    demo: {
        tick: function (model, sm) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.arc(model.x, model.y, 5, 0, Math.PI * 2);
            ctx.stroke();
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


var loop = function () {
    requestAnimationFrame(loop);
    sm[sm.currentState].tick(sm.model, sm);
};
loop();
