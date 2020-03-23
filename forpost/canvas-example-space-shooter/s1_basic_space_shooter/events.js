// EVENTS
(function () {
    var canvas = States.canvas
        // move ship handler that will work with mouse
        // and touch events
        var moveShip = function (e) {
        var bx = e.target.getBoundingClientRect(),
        x = 0,
        y = 0,
        cx,
        cy;
        if (e.touches) {
            x = e.touches[0].clientX - bx.left;
            y = e.touches[0].clientY - bx.top;
            console.log(e.touches);
        } else {
            x = e.clientX - bx.left;
            y = e.clientY - bx.top;
        }
        cx = canvas.width / 2,
        cy = canvas.height / 2;
        States.disp.ship.heading = Math.PI + Math.atan2(cy - y, cx - x);
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
