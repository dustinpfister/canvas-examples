
(function () {

    // SETUP CANVAS
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
            width: 320,
            height: 240
        }),
    canvas = canvasObj.canvas,
    ctx = canvasObj.ctx;

    // BUTTON OBJECT POOL
    var buttonPool = poolMod.create({
            spawn: function (obj, pool, sm, opt) {
                // just ref opt for the data object
                obj.data = opt;
                obj.x = opt.hx;
                obj.y = opt.hy;
                obj.w = opt.w || 128;
                obj.h = opt.h || 32;
            },
            // update the button
            update: function (obj, pool, sm, secs) {
                var fp = {
                    sx: obj.data.sx || 0,
                    sy: obj.data.sy || 0,
                    dist: obj.data.dist || 0,
                    heading: obj.data.heading || 0,
                    frame: Math.round(sm.trans.secs / sm.trans.secsTotal * 50),
                    frameMax: 50,
                    rev: !sm.trans.inState // use trans instate bool to ser rev
                };
                poolMod.moveByFramePerObj(obj, fp);
                obj.lifespan = 1;
            }
        });

    // STATE MACHINE
    var sm = {
        ver: '0.3.0',
        canvas: canvas,
        ctx: ctx,
        game: {},
        lt: new Date(),
        currentState: 'title',
        trans: {
            active: true,
            inState: true,
            secs: 0,
            secsTotal: 0.5,
            onDone: utils.noop
        },
        states: {},
        buttons: buttonPool
    };
    // change the current state and set up a 'in' transition for the new state
    var changeState = function (sm, stateKey) {
        sm.currentState = stateKey;
        sm.trans.active = true;
        sm.trans.inState = true;
        sm.trans.secs = 0;
        sm.states[sm.currentState].init(sm);
    };
    // start a 'out' transition to a state change
    var startStateChangeTrans = function(sm, stateKey){
        sm.trans.active = true;
        sm.trans.inState = false;
        sm.trans.secs = 0;
        sm.trans.onDone = function(sm){
            changeState(sm, stateKey);
            sm.trans.onDone = function(){};
            sm.trans.onDone = utils.noop;
        };
    };
    // update state by calling trans or update method
    var updateState = function (sm, secs) {
        if (sm.trans.active) {
            if (sm.trans.secs < sm.trans.secsTotal) {
                sm.trans.secs += secs;
                sm.trans.secs = sm.trans.secs > sm.trans.secsTotal ? sm.trans.secsTotal : sm.trans.secs;
                if (sm.trans.secs === sm.trans.secsTotal) {
                    sm.trans.active = false;
                    sm.trans.onDone(sm);
                }
            }
            sm.states[sm.currentState].trans(sm, secs);
        } else {
            sm.states[sm.currentState].update(sm, secs);
        }
    };

    // TITLE STATE
    sm.states.title = {
        init: function (sm) {
            // set all button object to inactive
            poolMod.setActiveStateForAll(sm.buttons, false);
            // spawn object for new Game button
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_state_game',
                disp: 'New Game',
                // start x and y where the button should start
                sx: -150,
                sy: sm.canvas.height / 2,
                dist: 250, // distance and heading from start location
                heading: 0,
                rev: false
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.titleText(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'set_state_game'){
                    startStateChangeTrans(sm, 'game');
                }
            }
        }
    };

    // GAME STATE
    sm.states.game = {
        init: function (sm) {
            // create a new game object
            sm.game = gameMod.create();
            // set all button object to inactive
            poolMod.setActiveStateForAll(sm.buttons, false);
            // spawn object for new Game button
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_state_gameover',
                disp: 'Quit',
                sx: sm.canvas.width + 32,
                sy: 0,
                dist: 64,
                heading: Math.PI,
                rev: false,
                w: 32,
                h: 32
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {
            gameMod.update(sm.game, secs);
        },
        draw: function (sm, ctx, canvas) {
            draw.PTL(ctx, canvas, sm.game);
            draw.pool(ctx, sm.buttons);
            draw.info(ctx, canvas, sm.game);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'set_state_gameover'){
                    startStateChangeTrans(sm, 'gameOver');
                }
            } else {
                gameMod.click(sm.game);
            }
        }
    };

    // GAME OVER STATE
    sm.states.gameOver = {
        init: function (sm) {
            // set all button object to inactive
            poolMod.setActiveStateForAll(sm.buttons, false);

            // spawn object for new Game button
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_state_title',
                disp: 'Back',
                sx: sm.canvas.width + 32,
                sy: sm.canvas.height / 2 - 16,
                dist: 128,
                heading: Math.PI,
                rev: false,
                w: 128,
                h: 32
            });

        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {
        },
        draw: function (sm, ctx, canvas) {
            draw.PTL(ctx, canvas, sm.game);
            draw.pool(ctx, sm.buttons);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'set_state_title'){
                    startStateChangeTrans(sm, 'title');
                }
            }
        }
    };

    // LOOP
    changeState(sm, 'game');
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        updateState(sm, secs);
        draw.background(ctx, canvas, '#0a0a0a');
        sm.states[sm.currentState].draw(sm, ctx, canvas);
        draw.ver(ctx, canvas, sm);
        sm.lt = now;
    };
    loop();

    // EVENTS
    canvas.addEventListener('click', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });

}
    ());
