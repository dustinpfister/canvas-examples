// SETUP CANVAS
(function(){
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
        width: 320,
        height: 240
    }),
    canvas = canvasObj.canvas,
    ctx = canvasObj.ctx;
    // BUTTON OBJECT POOL
    var buttonPool = poolMod.create
    // STATE MACHINE
    var sm = {
        game : gameMod.create(),
        lt : new Date(),
        currentState: 'title',
        states: {},
        buttons: buttonPool
    };
    // GAME TITLE
    sm.states.title = {
        update: function(sm, secs){
        },
        draw: function(sm, ctx, canvas){
            draw.titleText(ctx, canvas, sm);
        },
        click: function(sm, pos, e){
            sm.currentState = 'game';
        }
    };
    // GAME STATE
    sm.states.game = {
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
    // attach event hanlder
    canvas.addEventListener('click', function(e){
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });
}());
