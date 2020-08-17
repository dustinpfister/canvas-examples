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
                toGame: buttonMod.create({
                    label: 'game',
                    x: 25,
                    y: 200,
                    r: 10,
                    onClick: function (button, sm) {
                        // set state to game
                        sm.currentState = 'game';
                    }
                }),
                debugMode: buttonMod.create({
                    x: 100,
                    y: 120,
                    r: 16,
                    type: 'options',
                    options: ['none', 'general', 'weapon', 'level', 'map'],
                    onClick: function (button, sm) {
                        sm.debugMode = button.options[button.currentOption];
                    }
                })
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
                buttons = state.buttons,
                pos = utils.getCanvasRelative(e);
                // check buttons for options state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);

            },
            pointerMove: function () {},
            pointerEnd: function () {}
        },

        game: {

            buttons: {
                options: buttonMod.create({
                    label: 'options',
                    fontSize: 10,
                    x: 25,
                    y: 200,
                    r: 10,
                    onClick: function (button, sm) {
                        sm.currentState = 'options';
                    }
                }),
                changeWeapon: buttonMod.create({
                    label: 'Next Weapon',
                    fontSize: 8,
                    x: 280,
                    y: 210,
                    r: 16,
                    onClick: function (button, sm) {
                        sm.game.weaponIndex += 1;
                        sm.game.weaponIndex %= gameMod.Weapons.length;
                    }
                }),
                autoPlay: buttonMod.create({
                    label: 'Auto Play',
                    type: 'toggle',
                    fontSize: 8,
                    x: 25,
                    y: 175,
                    r: 10,
                    bool: true,
                    onClick: function (button, sm) {
                        var ap = sm.game.autoPlay;
                        ap.delay = ap.maxDelay;
                    },
                    onActive: function (button, sm) {
                        sm.game.autoPlay.enabled = button.bool;
                    },
                    onInactive: function (button, sm) {
                        sm.game.autoPlay.enabled = button.bool;
                    }
                })
            },

            update: function (sm, secs) {
                var state = states[sm.currentState];
                // update game state
                gameMod.update(sm.game, secs);

                // draw
                draw.back(ctx, canvas);
                draw.map(ctx, sm.game.map, sm.game.cross);
                draw.explosions(ctx, sm.game);
                draw.cross(ctx, sm.game);
                draw.shots(ctx, sm.game);
                //draw.damageBar(ctx, sm.game);
                draw.buttons(ctx, state.buttons);
                draw.ver(ctx, sm);
                draw.debug(sm);
            },
            pointerStart: function (sm, e) {

                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = utils.getCanvasRelative(e);
                // enable cross move back feature
                sm.game.cross.moveBackEnabled = true;
                crossMod.userAction(sm.game.cross, 'start', e);
                sm.game.userDown = true;

                // check buttons for game state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);

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
        ver: '0.14.0',
        canvas: canvas,
        debugMode: 'map',
        currentState: 'game',
        ctx: ctx,
        game: gameMod.create({
            canvas: canvas,
            mapXP: 10000,
            mapDeltaNext: 50,
            mapLevelCap: 10
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
