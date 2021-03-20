
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
            dist: utils.distance(bx.x, bx.y, sx, sy), //sm.canvas.width - 128,
            heading: utils.mod(angle + Math.PI, Math.PI * 2)
        });
    };
    // get a button by id
    var getButtonById = function(buttonPool, id){
        var result = buttonPool.objects.filter(function(button){
            return button.active && button.data.id === id;
        });
        if(result.length >= 1){
            return result[0];
        }
        return false;
    };

    // STATE MACHINE
    var sm = {
        ver: '1.0.1',
        appName: 'canvas-example-pop-the-lock',
        debugMode: false,
        canvas: canvas,
        ctx: ctx,
        game: {},
        highScores: {},
        lt: new Date(),
        currentState: 'title',
        gameModeIndex: 0,
        gameMode: '',
        modeSettings: {},
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
            poolMod.setActiveStateForAll(sm.dispObjects, false);
            // to gameMode state
            var x = sm.canvas.width / 2 - 128,
            y = sm.canvas.height / 2;
            spawnButton(sm, {x: x, y: y - 64}, 'start_state_gameMode', 'Play');
            spawnButton(sm, {x: x, y: y + 32}, 'goto_devsite_canvas_examples', 'More Games', Math.PI);

            // title display Object
            poolMod.spawn(sm.dispObjects, sm, {
                action: '',
                disp: 'Pop The Lock',
                sx: sm.canvas.width * 1.7 * 1,
                sy: 8,
                w: 512,
                h: 128,
                dist: sm.canvas.width * 1.6,
                heading: Math.PI,
                draw: function(ctx, obj){
                    draw.text_title(ctx, sm.canvas, obj);
                    //ctx.font = '50px arial';
                    //ctx.textBaseline = 'middle';
                    //ctx.textAlign = 'center';
                    //ctx.fillText('Pop The Lock', obj.x + obj.w / 2, obj.y + obj.h / 2);
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
            //draw.text_title(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
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
    var spawnSettingsButton = function(sm, setting, bx, actionString, dispText, angle, poolKey){
        var button = spawnButton(sm, bx, actionString, dispText, angle, poolKey);
        button.data.setting = setting;
        return button;
    };
    sm.states.gameMode = {
        init: function (sm) {
            poolMod.setActiveStateForAll(sm.buttons, false);
            // default to whatever key sm.gameModeIndex is for gameMode
            sm.gameMode = Object.keys(gameMod.modes)[sm.gameModeIndex];
            var mode = gameMod.modes[sm.gameMode];
            if(mode.createBackground){
                mode.background = mode.createBackground(sm, mode);
            }
            // create settings buttons
            mode.settings.forEach(function(setting, i){
                // set modeSettings object to Settings for current game Mode
                sm.modeSettings[setting.key] = setting.start;
                // down button
                var w = 64,
                h = 64,
                x = 8,
                y = 64 + 64 * i;
                // + / -
                spawnSettingsButton(sm, setting, {x: x, y: y, w: w, h : h}, 'set_modesettingDown_' + setting.key, '-');
                spawnSettingsButton(sm, setting, {x: x + w * 5, y: y, w: w, h : h}, 'set_modesettingUp_' + setting.key, '+');
                // setting disp
                w = 64 * 4;
                var button = spawnSettingsButton(sm, setting, 
                  {x: x + 64 * 1, y: y, w: w, h : h}, 
                  '', 
                   setting.disp + ' ' + sm.modeSettings[setting.key]);
                button.data.id = 'setting_disp_' + setting.key;
            });
            // next mode button
            var w = 64,
            h = 64;
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_mode_next',
                disp: 'Next',
                sy: sm.canvas.height * 1.5,
                sx: sm.canvas.width * 0.9 - (w / 2),
                w: w,
                h: h,
                dist: sm.canvas.height * 1 + (h / 2),
                heading: Math.PI * 1.5
            });
            // start game button
            var w = 250,
            h = 64;
            poolMod.spawn(sm.buttons, sm, {
                action: 'start_game',
                disp: 'Start Game',
                sy: sm.canvas.height * 1.5,
                sx: sm.canvas.width * 0.75 - (w / 2),
                w: w,
                h: h,
                dist: sm.canvas.height * 0.70,
                heading: Math.PI * 1.5
            });
            w = 125;
            poolMod.spawn(sm.buttons, sm, {
                action: 'start_title',
                disp: 'Title',
                sy: sm.canvas.height * 1.5,
                sx: sm.canvas.width * 0.85 - (w / 2),
                w: w,
                h: h,
                dist: sm.canvas.height * 1.475,
                heading: Math.PI * 1.5
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.font='50px arial';
            ctx.fillText(sm.gameMode, 10, 10);
            //ctx.font='10px arial';
            draw.pool(ctx, sm.buttons);
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
                    console.log('hello');
                    if(parts[1] === 'modesettingUp'){
                         var modeProp = sm.modeSettings[parts[2]],
                         settingObj = button.data.setting,
                         range = settingObj.range;
                         modeProp += 1;
                         sm.modeSettings[parts[2]] = modeProp > range[1] ? range[0]: modeProp;
                         var dispButton = getButtonById(sm.buttons, 'setting_disp_' + settingObj.key);
                         dispButton.data.disp = settingObj.disp + ' ' + sm.modeSettings[parts[2]];
                         
                    }
                    if(parts[1] === 'modesettingDown'){
                         var modeProp = sm.modeSettings[parts[2]],
                         settingObj = button.data.setting,
                         range = settingObj.range;
                         modeProp -= 1;
                         sm.modeSettings[parts[2]] = modeProp < range[0] ? range[1]: modeProp;
                         var dispButton = getButtonById(sm.buttons, 'setting_disp_' + settingObj.key);
                         dispButton.data.disp = settingObj.disp + ' ' + sm.modeSettings[parts[2]];
                    }
                }
            }
        }
    };

    // GAME STATE
    sm.states.game = {
        init: function (sm) {
            poolMod.setActiveStateForAll(sm.buttons, false);
            // Quit Button
            var margin = 10;
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_state_gameover',
                disp: 'Quit',
                sx: sm.canvas.width + 80,
                sy: margin,
                dist: 160 + margin,
                heading: Math.PI,
                rev: false,
                w: 80,
                h: 80
            });
            // create a new game object
            sm.game = gameMod.create({
               mode: sm.gameMode,
               modeSettings: sm.modeSettings
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
            draw.backgroundMode(ctx, canvas, sm);

            //draw.PTL(ctx, canvas, sm.game);
            //draw.score(ctx, canvas, sm);
            gameMod.modes[sm.gameMode].draw(ctx, canvas, sm);

            draw.pool(ctx, sm.buttons);
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
            poolMod.setActiveStateForAll(sm.buttons, false);
            var dispText = ['Title', 'Settings', 'Try Again'];
            ['title', 'gameMode','game'].forEach(function(stateKey, i){
                poolMod.spawn(sm.buttons, sm, {
                    action: 'set_state_' + stateKey,
                    disp: dispText[i],
                    sx: sm.canvas.width,
                    sy: sm.canvas.height * 0.75 - (64 + 20) * i ,
                    dist: 256 + 20,
                    heading: Math.PI,
                    rev: false,
                    w: 256,
                    h: 64
                });
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
            draw.backgroundMode(ctx, canvas, sm);
            draw.PTL(ctx, canvas, sm.game);
            draw.background(ctx, canvas, 'rgba(0,0,0,0.8)');
            draw.text_gameover(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
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
