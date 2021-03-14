
(function () {

    // SETUP CANVAS
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
            width: 640,
            height: 480
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
        ver: '0.5.0',
        appName: 'canvas-example-pop-the-lock',
        canvas: canvas,
        ctx: ctx,
        game: {},
        highScores: {},
        lt: new Date(),
        currentState: 'title',
        gameMode: 'freePlay',
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
                action: 'start_game_freePlay',
                disp: 'New Freeplay Game',
                sx: -150,
                sy: sm.canvas.height / 2,
                dist: sm.canvas.width / 2 + 75,
                heading: 0,
                rev: false
            });
            // spawn object for new Game button
            poolMod.spawn(sm.buttons, sm, {
                action: 'start_game_endurance',
                disp: 'New Endurance Game',
                sx: sm.canvas.width + 150,
                sy: sm.canvas.height / 2 + 32,
                dist: sm.canvas.width / 2 + 150 + 75, 
                heading: Math.PI,
                rev: false
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.text_title(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'start_game_freePlay'){
                    sm.gameMode = 'freePlay';
                    startStateChangeTrans(sm, 'game');
                }
                if(button.data.action === 'start_game_endurance'){
                    sm.gameMode = 'endurance';
                    startStateChangeTrans(sm, 'game');
                }
            }
        }
    };

    // GAME STATE
    sm.states.game = {
        init: function (sm) {
            poolMod.setActiveStateForAll(sm.buttons, false);
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
            // create a new game object
            sm.game = gameMod.create({
               mode: sm.gameMode
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {
            gameMod.update(sm.game, secs);
            if(sm.game.gameOver){
                startStateChangeTrans(sm, 'gameOver');
            }
        },
        draw: function (sm, ctx, canvas) {
            draw.PTL(ctx, canvas, sm.game);
            draw.score(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
            draw.debugInfo(ctx, canvas, sm.game);
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
            poolMod.setActiveStateForAll(sm.buttons, false);
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_state_title',
                disp: 'Back',
                sx: sm.canvas.width + 32,
                sy: sm.canvas.height / 2,
                dist: 165,
                heading: Math.PI,
                rev: false,
                w: 128,
                h: 32
            });
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_state_game',
                disp: 'Play New Game',
                sx: sm.canvas.width + 32,
                sy: sm.canvas.height / 2 - 32,
                dist: 165,
                heading: Math.PI,
                rev: false,
                w: 128,
                h: 32
            });

            // update any save that might be there
            var highScore = sm.highScores[sm.game.mode];
            if(!highScore || highScore < sm.game.score){
                sm.highScores[sm.game.mode] = sm.game.score;
                utils.save(sm.appName, 0, sm.highScores);
            }
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {
        },
        draw: function (sm, ctx, canvas) {
            draw.PTL(ctx, canvas, sm.game);
            draw.background(ctx, canvas, 'rgba(0,0,0,0.8)');
            draw.text_gameover(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'set_state_title'){
                    startStateChangeTrans(sm, 'title');
                }
                if(button.data.action === 'set_state_game'){
                    startStateChangeTrans(sm, 'game');
                }
            }
        }
    };

    // LOOP
    var highScores = utils.load(sm.appName, '0');
    if(highScores){
        sm.highScores = highScores;
    }
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
    canvas.addEventListener('mousedown', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });
    canvas.addEventListener('touchstart', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });

}
    ());
