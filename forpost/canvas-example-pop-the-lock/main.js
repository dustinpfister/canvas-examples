
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
    var createButtonPool = function(count){
        return poolMod.create({
            count: count || 20,
            maxSecs: 0.25,
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
                obj.lifespan = Infinity; // keep setting lifespan to 1
            }
        });
    };
    // a spawn button helper
    var spawnButton = function(sm, bx, actionString, dispText, angle, poolKey){
        poolKey = poolKey === undefined ? 'buttons' : poolKey;
        angle = angle === undefined ? Math.PI * 0.5 : angle;
        var sx = bx.x + Math.cos(angle) * sm.canvas.width,
        sy = bx.y + Math.sin(angle) * sm.canvas.width;
        return poolMod.spawn(sm[poolKey], sm, {
            action: actionString,
            disp: dispText,
            sx: sx, //sm.canvas.width * 0.5 * -1,
            sy: sy, //sm.canvas.height * 0.4,
            w: bx.w || 256,
            h: bx.h || 64,
            alpha: 0.4,  // alpha value for background
            alpha2: 0.8, // alpha value for text and border
            dist: utils.distance(bx.x, bx.y, sx, sy), //sm.canvas.width - 128,
            heading: utils.mod(angle + Math.PI, Math.PI * 2)
        });
    };
    // get a button by id
    var getButtonByAction = function(buttonPool, action){
        var result = buttonPool.objects.filter(function(button){
            return button.active && button.data.action === action;
        });
        if(result.length >= 1){
            return result[0];
        }
        return false;
    };

    // STATE MACHINE
    var sm = {
        ver: '1.0.4',
        appName: 'canvas-example-pop-the-lock',
        debugMode: false,
        pixmaps: pixmapMod.create(),
        canvas: canvas,
        ctx: ctx,
        game: {},
        highScores: {},
        lt: new Date(),
        currentState: 'title',
        gameModeIndex: 0,
        gameMode: '',
        modeSettingsCollection: {},
        modeSettings: {}, // current modeSettingsObject in modeSettingsCollection
        trans: {
            active: true,
            inState: true,
            secs: 0,
            secsTotal: 0.75,
            onDone: utils.noop
        },
        states: {},
        buttons: createButtonPool(20),
        dispObjects: createButtonPool(2),
        background: 'blue'
    };
    // change the current state and set up a 'in' transition for the new state
    var changeState = function (sm, stateKey) {
        sm.currentState = stateKey;
        sm.trans.active = true;
        sm.trans.inState = true;
        sm.trans.secs = 0;
        // reset pools
        poolMod.setActiveStateForAll(sm.buttons, false);
        poolMod.setActiveStateForAll(sm.dispObjects, false);
        // call init method for the new state
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
            // Buttons
            var x = sm.canvas.width / 2 - 128,
            y = sm.canvas.height / 2;
            spawnButton(sm, {x: x, y: y - 64}, 'start_state_gameMode', 'Play');
            spawnButton(sm, {x: x, y: y + 32}, 'goto_devsite_canvas_examples', 'More Games', Math.PI);

            // title display Object
            poolMod.spawn(sm.dispObjects, sm, {
                action: 'dispobj_title',
                disp: 'Pop The Lock',
                sx: sm.canvas.width * 1.7 * 1,
                sy: 8,
                w: 512,
                h: 128,
                dist: sm.canvas.width * 1.6,
                heading: Math.PI,
                draw: function(ctx, obj){
                    draw.text_title(ctx, sm.canvas, obj);
                }
            });
            // setup a background
            sm.background = draw.createGradient(sm.ctx, sm.canvas, 0.75, [[0,'#cc0000'],[0.25,'purple'],[1,'cyan']]);
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'start_state_gameMode'){
                    startStateChangeTrans(sm, 'gameMode');
                }
                if(button.data.action === 'goto_devsite_canvas_examples'){
                    console.log('to dev site');
                    document.location.href = 'https://dustinpfister.github.io/2020/03/23/canvas-example/';
                }
            }
        }
    };

    // GAME MODE STATE
    var spawnSettingsButton = function(sm, setting, bx, actionStringPart, dispText, angle, poolKey){
        var actionString = 'set_modesetting_' + actionStringPart + '_' + setting.key;
        var button = spawnButton(sm, bx, actionString, dispText, angle, poolKey);
        button.data.setting = setting;
        return button;
    };
    // set mode prop helper
    var setModeProp = function(sm, parts, button, dir){
        var modeProp = sm.modeSettings[parts[3]],
        settingObj = button.data.setting,
        range = settingObj.range;
        // step modeProp
        modeProp += 1 * dir;
        // wrap modeProp
        modeProp = dir === -1 && modeProp < range[0] ? range[1]: modeProp;
        modeProp = dir === 1 && modeProp > range[1] ? range[0]: modeProp;
        sm.modeSettings[parts[3]] = modeProp;
        var dispButton = getButtonByAction(sm.buttons, 'set_modesetting_current_' + settingObj.key);
        dispButton.data.disp = settingObj.disp + ' ' + sm.modeSettings[parts[3]];
    };
    sm.states.gameMode = {
        init: function (sm) {
            // default to whatever key sm.gameModeIndex is for gameMode
            sm.gameMode = Object.keys(gameMod.modes)[sm.gameModeIndex];
            var mode = gameMod.modes[sm.gameMode];
            if(mode.createBackground){
                mode.background = mode.createBackground(sm, mode);
            }
            // ref mode settings object in sm.modeSettingsCollection
            sm.modeSettings = sm.modeSettingsCollection[sm.gameMode];
            // create settings buttons
            mode.settings.forEach(function(setting, i){
                // down button
                var w = 64,
                h = 64,
                x = 8,
                y = 64 + 64 * i;
                // + / -
                spawnSettingsButton(sm, setting, {x: x, y: y, w: w, h : h}, 'down', '-');
                spawnSettingsButton(sm, setting, {x: x + w * 5, y: y, w: w, h : h}, 'up', '+');
                // setting disp
                w = 64 * 4;
                spawnSettingsButton(sm, setting, 
                  {x: x + 64 * 1, y: y, w: w, h : h}, 
                  'current', 
                   setting.disp + ' ' + sm.modeSettings[setting.key]);
            });
            // next mode button
            var w = 64,
            h = 64;
            spawnButton(sm, {x: canvas.width - 80, y: 200, w: w, h: h}, 'set_mode_next', 'Next');
            // start game button
            var w = 250,
            h = 64;
            spawnButton(sm, {x: canvas.width - 275, y: canvas.height - 80, w: w, h: h}, 'start_game', 'Start');
            // back to title
            w = 125;
            spawnButton(sm, {x: canvas.width - 150, y: 32, w: w, h: h}, 'start_title', 'Title');
            // current mode display Object
            var disp = spawnButton(sm, {x: 8, y: 8, w: 200, h: 32}, 'dispobj_currentMode', sm.gameMode, 0, 'dispObjects');
            disp.data.draw = function(ctx, obj){
                ctx.fillStyle = 'white';
                ctx.textBaseline = 'top';
                ctx.textAlign = 'left';
                ctx.font='50px arial';
                ctx.fillText(obj.data.disp, obj.x, obj.y);
            };
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'start_game'){
                    startStateChangeTrans(sm, 'game');
                }
                if(button.data.action === 'start_title'){
                    startStateChangeTrans(sm, 'title');
                }
                if(button.data.action === 'set_mode_next'){
                    sm.gameModeIndex += 1;
                    sm.gameModeIndex = utils.mod(sm.gameModeIndex, Object.keys(gameMod.modes).length);
                    startStateChangeTrans(sm, 'gameMode');
                }
                var parts = button.data.action.split('_');
                if(parts[0] === 'set'){
                    if(parts[2] === 'up'){
                        setModeProp(sm, parts, button, 1);
                    }
                    if(parts[2] === 'down'){
                        setModeProp(sm, parts, button, -1);
                    }
                }
            }
        }
    };

    // GAME STATE
    sm.states.game = {
        init: function (sm) {
            // Quit Button
            spawnButton(sm, {x: canvas.width - 72, y: 8, w: 64, h: 64}, 'set_state_gameover', 'Quit', Math.PI);
            // PTL area display Object
            var disp = spawnButton(sm, {x: 0, y: 0, w: canvas.width, h: canvas.height}, 
                'dispobj_ptl', sm.gameMode, Math.PI * 1.5, 'dispObjects');
            disp.data.draw = function(ctx, obj){
                ctx.save();
                ctx.translate(obj.x, obj.y);
                gameMod.modes[sm.gameMode].draw(ctx, canvas, sm);
                ctx.restore();
            };
            // create a new game object
            sm.game = gameMod.create({
               mode: sm.gameMode,
               modeSettings: sm.modeSettings
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {
            gameMod.update(sm.game, secs);
            if(sm.game.gameOver){
                startStateChangeTrans(sm, 'gameOver');
            }
        },
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
            if(sm.debugMode){
                draw.debugInfo(ctx, canvas, sm.game);
            }
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'set_state_gameover'){
                    startStateChangeTrans(sm, 'gameOver');
                }
            } else {
                gameMod.click(sm.game, sm.modeSettings);
            }
        }
    };

    // GAME OVER STATE
    sm.states.gameOver = {
        init: function (sm) {
            // option buttons
            var dispText = ['Try Again', 'Settings', 'Title'];
            ['game', 'gameMode', 'title'].forEach(function(stateKey, i){
            var bx = {x: canvas.width - 176, y: canvas.height * 0.25 + 70 * i, w: 168, h: 64};
                spawnButton(sm, bx, 'set_state_' + stateKey, dispText[i], 0);
            });
            // Game Over text area display Object
            var disp = spawnButton(sm, {x: 0, y: 0, w: canvas.width, h: canvas.height}, 
                'dispobj_gameOver', sm.gameMode, Math.PI * 0.5, 'dispObjects');
            disp.data.draw = function(ctx, obj){
                ctx.save();
                ctx.translate(obj.x, obj.y);
                draw.text_gameover(ctx, canvas, sm);
                ctx.restore();
            };
            // update any save that might be there
            var highScore = sm.highScores[sm.game.mode];
            if(!highScore || highScore < sm.game.score){
                sm.highScores[sm.game.mode] = sm.game.score;
                utils.save(sm.appName, 0, sm.highScores);
            }
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {
        },
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            draw.background(ctx, canvas, 'rgba(0,0,0,0.8)');
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                ['title', 'gameMode','game'].forEach(function(stateKey, i){
                    if(button.data.action === 'set_state_' + stateKey){
                        startStateChangeTrans(sm, stateKey);
                    }
                });
            }
        }
    };

    // LOOP
    // high scores
    var highScores = utils.load(sm.appName, '0');
    if(highScores){
        sm.highScores = highScores;
    }
    // mode settings collection object
    sm.modeSettingsCollection = {};
    Object.keys(gameMod.modes).forEach(function(modeKey){
        var mode = gameMod.modes[modeKey],
        settings = {};
        mode.settings.forEach(function(settingObj){
            settings[settingObj.key] = settingObj.start;
        });
        sm.modeSettingsCollection[modeKey] = settings;
    });
    // start state
    changeState(sm, 'title');
    //sm.gameModeIndex = 2;
    //changeState(sm, 'gameMode');
    // the loop
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        updateState(sm, secs);

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
