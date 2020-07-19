var canvas = document.getElementById('the-canvas');
canvas.width = 320;
canvas.height = 240;

// CREATE STATE
var state = game.create({
        canvas: canvas
    });

// APP LOOP
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    game.update(state, secs);
    draw.background(state);
    draw.board(state);
    draw.player(state);
    draw.playerShots(state);
    draw.enemies(state);
    lt = now;
};
loop();

// KEYBOARD
var keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    k: false
};
var keyUpdate = function () {
    state.player.heading = 0;
    state.player.pps = 0;
    if (keys.d) {
        state.player.heading = 0;
    }
    if (keys.a) {
        state.player.heading = Math.PI;
    }
    if (keys.w) {
        state.player.heading = Math.PI * 1.5;
    }
    if (keys.s) {
        state.player.heading = Math.PI * 0.5;
    }
    if (keys.w || keys.a || keys.s || keys.d) {
        state.player.pps = 32;
    }

    if (keys.k) {
        game.playerFire(state);
    }

};

window.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase(),
    aKey = 'wasdk'.split('').some(function (aKey) {
            return aKey === key;
        });
    if (aKey) {
        keys[key] = true;
    }
    keyUpdate();
});

window.addEventListener('keyup', function (e) {
    var key = e.key.toLowerCase(),
    aKey = 'wasdk'.split('').some(function (aKey) {
            return aKey === key;
        });
    if (aKey) {
        keys[key] = false;
    }
    keyUpdate();
});
