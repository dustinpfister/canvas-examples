
(function () {
    var sm = stateMachine.create({
        appName: 'canvas-example-turret-defense',
        ver: '0.3.0',
        debugMode: true,
        saveSlotIndex: 0
    });

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
