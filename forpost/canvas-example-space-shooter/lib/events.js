// EVENTS
(function () {
    var canvas = States.canvas;
    // move ship handler that will work with mouse
    // and touch events
    var moveShip = function (e) {
        var cx = canvas.width / 2,
        cy = canvas.height / 2,
        pos = utils.getCanvasRelative(e);
        States.disp.ship.heading = Math.PI + Math.atan2(cy - pos.y, cx - pos.x);
    };
    // start game check
    var startGame = function () {
        if (States.current === 'gameOver') {
            States.reset = true;
        }
    };
    // Attach events
    canvas.addEventListener('mousemove', moveShip);
    canvas.addEventListener('touchmove', moveShip);
    canvas.addEventListener('mousedown', startGame);
    canvas.addEventListener('touchstart', startGame);
}
    ());
