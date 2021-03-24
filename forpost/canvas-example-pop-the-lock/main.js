
(function () {
    var sm = stateMachine.create();
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
    //stateMachine.changeState(sm, 'title');
    sm.gameModeIndex = 3;
    stateMachine.changeState(sm, 'gameMode');
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
