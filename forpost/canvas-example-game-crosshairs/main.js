// MAIN file including state machine
(function () {

    var canvasObj = utils.createCanvas({
        width: 320,
        height: 240
    });
    var canvas = canvasObj.canvas;
    var ctx = canvasObj.ctx;

    // save string helpers
    var saveStateString = function (sm) {
        localStorage.setItem('game-crosshairs-save-0', gameMod.createSaveString(sm.game));
    };
    var loadStateString = function () {
        //return 'v1.0.1.0-0-0-0-.';
        return localStorage.getItem('game-crosshairs-save-0') //'v0.epz.'
    };

    var states = {

        init: {
            // for each update tick
            update: function (sm, secs) {
                // create game object
                sm.game = gameMod.create({
                        canvas: canvas,
                        totalDamage: 0,
                        startingCellDamage: 0,
                        mapXP: 0,
                        mapDeltaNext: 50,
                        mapLevelCap: 20,
                        saveString: loadStateString()
                    });
                // createing skill manager buttons
                states.skillManager.buttons = gameMod.createSkillButtons(sm);
                sm.currentState = 'game';
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

        // OPTIONS STATE
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
                toSkillsManager: buttonMod.create({
                    label: 'Skills',
                    x: 100,
                    y: 120,
                    r: 16,
                    onClick: function (button, sm) {
                        // set state to map
                        sm.currentState = 'skillManager';
                    }
                }),
                toMap: buttonMod.create({
                    label: 'Map',
                    x: 100 + 40,
                    y: 120,
                    r: 16,
                    onClick: function (button, sm) {
                        // set state to map
                        sm.currentState = 'map';
                    }
                }),
                debugMode: buttonMod.create({
                    x: 100 + 80,
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
                draw.ver(ctx, sm);
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

        // GAME STATE
        game: {
            buttons: {
                options: buttonMod.create({
                    label: 'options',
                    fontSize: 10,
                    x: 25,
                    y: 200,
                    r: 10,
                    onClick: function (button, sm) {
                    },
                    onFrame: function(button, sm, frame){
                        button.x = button.hx - 64 + 64 * frame.per;
                    },
                    onInStart: function(button, sm){
                        button.x = button.hx - 100;
                    },
                    onInEnd: function(button, sm){
                        button.x = button.hx;
                    },
                    onOutStart: function(button, sm){
                        button.x = button.hx;
                        // set out state for all
                        Object.keys(sm.states.game.buttons).forEach(function(key){
                            var button = sm.states.game.buttons[key];
                            button.frame.state = 'out';
                        });
                    },
                    onOutEnd: function(button, sm){
                        button.x = button.hx - 100;
                        sm.currentState = 'options';
                    }
                }),
                changeWeapon: buttonMod.create({
                    label: 'Next Weapon',
                    fixed: true, // first type that will not trigger animation when clicked
                    fontSize: 8,
                    x: 280,
                    y: 210,
                    r: 16,
                    onClick: function (button, sm) {
                        sm.game.weaponIndex += 1;
                        sm.game.weaponIndex %= sm.game.highWeaponIndex + 1;
                        console.log(sm.game.weaponIndex);
                    },
                    onFrame: function(button, sm, frame){
                        //console.log(button.label, frame.current);
                        //console.log(frame);
                        button.x = button.hx + 100 - 100 * frame.per; // + 100 * frame.per;
                    },
                    onInStart: function(button, sm){
                        //console.log(button.label, 'in start');
                        button.x = button.hx + 100;
                    },
                    onInEnd: function(button, sm){
                        button.x = button.hx;
                        console.log('in end');
                    },
                    onOutStart: function(button, sm){
                        button.x = button.hx;
                        console.log(button.label, 'out start');
                    },
                    onOutEnd: function(button, sm){
                        button.x = button.hx + 100;
                        console.log('out end');
                        //sm.currentState = 'options';
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
                buttonMod.updateCollection(state.buttons, secs, sm);

                // auto save
                saveStateString(sm);

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
                crossMod.userAction(sm.game.cross, 'start', pos);
                sm.game.userDown = true;
                // check buttons for game state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);
            },
            pointerEnd: function (em, e) {
                var pos = utils.getCanvasRelative(e);
                crossMod.userAction(sm.game.cross, 'end', pos);
                sm.game.userDown = false;
            },
            pointerMove: function (sm, e) {
                var pos = utils.getCanvasRelative(e);
                crossMod.userAction(sm.game.cross, 'move', pos);
            }
        },

        skillManager: {

            // use createSkillButtons gameMod method for buttons here
            buttons: {},

            update: function (sm, secs) {
                var state = states[sm.currentState];
                draw.back(ctx, canvas);

                // update game but with zero seconds
                gameMod.update(sm.game, 0);

                draw.buttons(ctx, state.buttons);
                draw.skillPointInfo(ctx, sm);
                draw.ver(ctx, sm);
                draw.debug(sm);
            },
            pointerStart: function (sm, e) {
                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = utils.getCanvasRelative(e);
                // check buttons for skillManager state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);

                saveStateString(sm);
            },
            pointerEnd: function (em, e) {},
            pointerMove: function (sm, e) {}
        },

        // MAP STATE
        map: {
            buttons: {
                toOptions: buttonMod.create({
                    label: 'Options',
                    x: 25,
                    y: 200,
                    r: 10,
                    onClick: function (button, sm) {
                        // set state to options
                        sm.currentState = 'options';
                    }
                }),
                levelUp: buttonMod.create({
                    label: 'Level +',
                    x: 160 - 30,
                    y: 180,
                    r: 20,
                    onClick: function (button, sm) {
                        var level = sm.game.mapLevelObj.level;
                        level += 1;
                        sm.game.mapXP = XP.parseByLevel(level, sm.game.mapLevelCap, sm.game.mapDeltaNext).xp;
                        gameMod.setMap(sm.game, sm.game.mapXP, sm.game.mapDeltaNext, sm.game.mapLevelCap);
                    }
                }),
                levelDown: buttonMod.create({
                    label: 'Level -',
                    x: 160 + 30,
                    y: 180,
                    r: 20,
                    onClick: function (button, sm) {
                        var level = sm.game.mapLevelObj.level;
                        level -= 1;
                        sm.game.mapXP = XP.parseByLevel(level, sm.game.mapLevelCap, sm.game.mapDeltaNext).xp;
                        gameMod.setMap(sm.game, sm.game.mapXP, sm.game.mapDeltaNext, sm.game.mapLevelCap);
                    }
                })
            },
            update: function (sm, secs) {
                var state = states[sm.currentState];
                draw.back(ctx, canvas);
                draw.buttons(ctx, state.buttons);
                draw.mapInfo(ctx, sm.game);
                draw.ver(ctx, sm);
                draw.debug(sm);
            },
            pointerStart: function (sm, e) {
                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = utils.getCanvasRelative(e);
                // check buttons for map state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);
            },
            pointerEnd: function (em, e) {},
            pointerMove: function (sm, e) {}
        }
    };

    var sm = {
        ver: '0.22.0',
        canvas: canvas,
        ctx: ctx,
        debugMode: 'none',
        currentState: 'init',
        game: {},
        states: states,
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
