
(function(){

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
        spawn: function(obj, pool, sm, opt){
            console.log(opt);
            obj.x = opt.hx;
            obj.y = opt.hy;
        },
        update: function(obj, pool, state, secs){
            obj.lifespan = 1;
        }
    });

    // STATE MACHINE
    var sm = {
        game : gameMod.create(),
        lt : new Date(),
        currentState: 'title',
        states: {},
        buttons: buttonPool
    };
    var changeState = function(sm, stateKey){
        sm.currentState = stateKey;
        sm.states[sm.currentState].init(sm);
    };

    // TITLE STATE
    sm.states.title = {
        init: function(sm){
            // set all button object to inactive
            poolMod.setActiveStateForAll(sm.buttons, false);
            // spawn object for new Game button
            poolMod.spawn(sm.buttons, sm, {
                action:'set_state_game',
                hx: 128,
                hy: 128
            });
        },
        update: function(sm, secs){
        },
        draw: function(sm, ctx, canvas){
            draw.titleText(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
        },
        click: function(sm, pos, e){
            //changeState(sm, 'game');
            console.log( poolMod.getObjectAt(sm.buttons, pos.x, pos.y) );
        }
    };

    // GAME STATE
    sm.states.game = {
        init: function(sm){
        },
        update: function(sm, secs){
            gameMod.update(sm.game, secs);
        },
        draw: function(sm, ctx, canvas){
            draw.PTL(ctx, canvas, sm.game);
        },
        click: function(sm, pos, e){
            gameMod.click(sm.game);
        }
    };

    // LOOP
    changeState(sm, 'title');
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        sm.states[sm.currentState].update(sm, secs);
        draw.background(ctx, canvas, '#0a0a0a');
        sm.states[sm.currentState].draw(sm, ctx, canvas);
        draw.ver(ctx, canvas, sm.game);
        sm.lt = now;
    };
    loop();

    // EVENTS
    canvas.addEventListener('click', function(e){
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });

}());
