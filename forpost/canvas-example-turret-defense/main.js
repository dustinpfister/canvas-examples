(function () {
    // create sm object
    var sm = stateMachine.create({
        appName: 'canvas-example-turret-defense',
        ver: '0.4.0',
        debugMode: true,
        saveSlotIndex: 0,
        frameRate: 20
    });

    // start state
    stateMachine.changeState(sm, 'title');

    // the loop
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs >= 1 / sm.frameRate){
            stateMachine.updateState(sm, secs);
            sm.states[sm.currentState].draw(sm, sm.ctx, sm.canvas);
            draw.ver(sm.ctx, sm.canvas, sm);
            sm.lt = now;
        }

    };
    loop();

}());
