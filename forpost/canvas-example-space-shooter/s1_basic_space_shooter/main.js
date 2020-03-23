// Main APP loop
var loop = function () {
    requestAnimationFrame(loop);
    States.tick();
    draw();
};
loop();
