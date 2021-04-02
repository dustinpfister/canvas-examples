


(function () {
    var sm = stateMachine.create({
        appName: 'canvas-example-massive-attack',
        ver: '0.0.0',
        debugMode: false,
        saveSlotIndex: 0
    });

    //sm.background = draw.createGradient(sm.ctx, sm.canvas, 0.75, [[0,'gray'], [0.5,'black'], [1,'#004400']]);

    // start state
    stateMachine.changeState(sm, 'title');
    //sm.gameModeIndex = 0;
    //stateMachine.changeState(sm, 'gameMode');
    // the loop
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        stateMachine.updateState(sm, secs);
        sm.states[sm.currentState].draw(sm, sm.ctx, sm.canvas);
        draw.ver(sm.ctx, sm.canvas, sm);
        sm.lt = now;
    };
    loop();
    // EVENTS
    sm.canvas.addEventListener('mousedown', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });
    sm.canvas.addEventListener('touchstart', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });
}());


/*
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
var sm = {
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create(),
    resetButton: {
        x: canvasObj.canvas.width - 48,
        y: 8,
        w: 40,
        h: 40
    },
    lt: new Date()
};


sm.canvas.addEventListener('click', function (e) {
    var pos = utils.getCanvasRelative(e);

    // wave buttons
    waveMod.onClick(sm, pos);

    // unit
    var unit = poolMod.getObjectAt(sm.game.unitPool, pos.x, pos.y);
    if (unit) {
        unit.lifespan = 0;
    }

    // reset button
    var bx = sm.resetButton;
    if (utils.boundingBox(pos.x, pos.y, 1, 1, bx.x, bx.y, bx.w, bx.h)) {
        sm.game = gameMod.create();
    }

});

var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);

    gameMod.update(sm, secs);

    // draw
    draw.background(sm.ctx, sm.canvas, 'blue');
    draw.waveButtons(sm.ctx, sm.game.waveButtons.pool);
    draw.pool(sm.ctx, sm.game.unitPool);
    draw.resetButton(sm.ctx, sm);
    draw.debugInfo(sm.ctx, sm, 128, 32);
    sm.lt = now;
};
loop();
*/
