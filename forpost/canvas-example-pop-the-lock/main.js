
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
                console.log(opt);
                // just ref opt for the data object
                obj.data = opt;
                obj.x = opt.hx;
                obj.y = opt.hy;
                obj.w = opt.w || 128;
                obj.h = opt.h || 32;
            },
            update: function (obj, pool, sm, secs) {
                obj.lifespan = 1;
                //poolMod.moveByPPS(obj, secs);
                var fp = {
                    sx: obj.data.sx || 0,
                    sy: obj.data.sy || 0,
                    dist: obj.data.dist || 0,
                    heading: 0,
                    frame: Math.round(sm.trans.secs / sm.trans.secsTotal * 50),
                    frameMax: 50,
                    rev: false
                };
                poolMod.moveByFramePerObj(obj, fp);
            }
        });

    // STATE MACHINE
    var sm = {
        ver: '0.2.0',
        canvas: canvas,
        ctx: ctx,
        game: {},
        lt: new Date(),
        currentState: 'title',
        trans: {
            active: true,
            inState: true,
            secs: 0,
            secsTotal: 1
        },
        states: {},
        buttons: buttonPool
    };
    var changeState = function (sm, stateKey) {
        sm.currentState = stateKey;
        sm.trans.active = true;
        sm.trans.secs = 0;
        sm.states[sm.currentState].init(sm);
    };
    var updateState = function (sm, secs) {
        if (sm.trans.active) {
            if (sm.trans.secs < sm.trans.secsTotal) {
                sm.trans.secs += secs;
                sm.trans.secs = sm.trans.secs > sm.trans.secsTotal ? sm.trans.secsTotal : sm.trans.secs;
                if (sm.trans.secs === sm.trans.secsTotal) {
                    sm.trans.active = false;
                    sm.trans.inState = !sm.trans.inState;
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
                // home x an y where the button will be displayed
                //hx: sm.canvas.width / 2 - 64,
                //hy: sm.canvas.height / 2,
                // start x and y where the button will start when state starts
                // and also where it will go when a state change happens
                sx: -128,
                sy: sm.canvas.height / 2,
                dist: 230,
                heading: 0
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
            var obj = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (obj) {
                changeState(sm, 'game');
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
                action: 'set_state_title',
                disp: 'Quit',
                hx: sm.canvas.width - 32,
                hy: 0,
                w: 32,
                h: 32
            });
        },
        trans: function (sm, secs) {},
        update: function (sm, secs) {
            gameMod.update(sm.game, secs);
        },
        draw: function (sm, ctx, canvas) {
            draw.PTL(ctx, canvas, sm.game);
            draw.pool(ctx, sm.buttons);
        },
        click: function (sm, pos, e) {
            var obj = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (obj) {
                changeState(sm, 'title');
            } else {
                gameMod.click(sm.game);
            }
        }
    };

    // LOOP
    changeState(sm, 'title');
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
