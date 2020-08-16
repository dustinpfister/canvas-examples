// MAIN file including state machine
(function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    var states = {

        options: {

            // button objects for the state
            buttons: {
                toGame: {
                    label: 'Game',
                    x: 300,
                    y: 20,
                    r: 10
                },
                debugMode: {
                    x: 32,
                    y: 32,
                    r: 16,
                    options: ['none', 'general', 'weapon', 'level', 'map'],
                    currentOption: 0
                }
            },

            // for each update tick
            update: function (sm, secs) {
                var state = states[sm.currentState];
                draw.back(ctx, canvas);
                draw.buttons(ctx, state.buttons);
                draw.debug(sm);
            },

            // events
            pointerStart: function (sm, e) {
                var state = states[sm.currentState],
                buttons = state.buttons;

                var pos = utils.getCanvasRelative(e);
                var b = buttons.toGame,
                d = utils.distance(pos.x, pos.y, b.x, b.y);
                if (d < b.r) {
                    sm.currentState = 'game';
                }

                b = buttons.debugMode;
                d = utils.distance(pos.x, pos.y, b.x, b.y);
                if (d < b.r) {
                    b.currentOption += 1;
                    b.currentOption = b.currentOption >= b.options.length ? 0 : b.currentOption;
                    sm.debugMode = b.options[b.currentOption];
                }

            },
            pointerMove: function () {},
            pointerEnd: function () {}
        },

        game: {
            update: function (sm, secs) {

                // update game state
                gameMod.update(sm.game, secs);

                // draw
                draw.back(ctx, canvas);
                draw.map(ctx, sm.game.map, sm.game.cross);
                draw.explosions(ctx, sm.game);
                draw.cross(ctx, sm.game);
                draw.shots(ctx, sm.game);
                draw.damageBar(ctx, sm.game);
                draw.buttons(ctx, gameMod.buttons);
                draw.ver(ctx, sm);
                draw.debug(sm);
            },
            pointerStart: function (sm, e) {
                var pos = utils.getCanvasRelative(e);
                // enable cross move back feature
                sm.game.cross.moveBackEnabled = true;
                crossMod.userAction(sm.game.cross, 'start', e);
                sm.game.userDown = true;
                // cycle weapons
                var b = gameMod.buttons.changeWeapon,
                d = utils.distance(pos.x, pos.y, b.x, b.y);
                if (d < b.r) {
                    sm.game.weaponIndex += 1;
                    sm.game.weaponIndex %= gameMod.Weapons.length;
                }

                b = gameMod.buttons.options;
                d = utils.distance(pos.x, pos.y, b.x, b.y);
                if (d < b.r) {
                    sm.currentState = 'options';
                }

            },
            pointerEnd: function (em, e) {
                crossMod.userAction(sm.game.cross, 'end', e);
                sm.game.userDown = false;
            },
            pointerMove: function (sm, e) {
                crossMod.userAction(sm.game.cross, 'move', e);
            }
        }

    };

    var sm = {
        ver: '0.12.0',
        canvas: canvas,
        debugMode: 'none',
        currentState: 'game',
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
            //console.log('start');
            states[sm.currentState].pointerStart(sm, e);
        },
        move: function (sm, e) {
            //console.log('move');
            states[sm.currentState].pointerMove(sm, e);
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
            //console.log('end');
            states[sm.currentState].pointerEnd(sm, e);
        }
    };

    var createPointerHandler = function (sm, type) {
        return function (e) {
            sm.input.pos = utils.getCanvasRelative(e);
            e.preventDefault();
            pointerHanders[type](sm, e);
        };
    };

    // attach for mouse and touch
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
    canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
    canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));

    var lt = new Date(),
    FPS_target = 30;
    var loop = function () {
        var now = new Date(),
        t = now - lt,
        secs = t / 1000;
        requestAnimationFrame(loop);
        if (t >= 1000 / FPS_target) {
            states[sm.currentState].update(sm, secs);
            lt = now;
        }
    };
    loop();

}
    ());
