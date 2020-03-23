var States = (function () {

    var lt = new Date(),
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');
    // HELPERS
    // make enemies
    var makeEnemies = function (level, canvas) {
        var e,
        enemies = [];
        // cap things past level 30
        var cap = level / 30;
        cap = cap > 1 ? 1 : cap;
        var count = level;
        while (count--) {
            e = new Ship({
                    canvas: canvas,
                    x: Math.floor(canvas.width * Math.random()),
                    y: Math.floor(canvas.height * Math.random()),
                    pps: 16 + Math.floor(64 * cap),
                    shotPPS: 64 + Math.floor(128 * cap),
                    shotLife: 5000,
                    heading: Math.PI * 2 * Math.random(),
                    shotDelay: 3000 - Math.floor(2500 * cap),
                    maxHP: 1 + Math.floor(15 * cap)
                });
            enemies.push(e);
        };
        return enemies;
    };
    // purge
    var purgeEnemies = function (enemies) {
        var i = enemies.length;
        while (i--) {
            var enemy = enemies[i];
            if (enemy.HP === 0) {
                enemies.splice(i, 1);
            }
        }
    };
    // setup a level
    var setupLevel = function (api) {
        //api.eCount = api.level;
        api.disp.enemies = makeEnemies(api.level, api.canvas);
        var ship = api.disp.ship;
        ship.x = canvas.width / 2;
        ship.y = canvas.width / 2;
        api.win = false;
        api.reset = false;
    };
    // PUBLIC API
    return {
        canvas: canvas,
        ctx: ctx,
        win: false,
        reset: false,
        //eCount: 1,
        level: 1,
        disp: {}, // display Objects to be used with the renderer
        current: 'init', // current state
        // Initialize the Game State
        init: function () {
            // player ship
            this.disp.ship = new Ship({
                    canvas: canvas,
                    x: 0,
                    y: 0,
                    pps: 32,
                    heading: Math.PI / 180 * 0
                });
            //this.eCount = 1;
            this.level = 1;
            setupLevel(this);
            this.current = 'game';
        },
        // Main Game State
        game: function () {
            var now = new Date(),
            t = now - lt,
            ship = this.disp.ship,
            enemies = this.disp.enemies;
            ship.update(t, enemies);
            enemies.forEach(function (enemy) {
                enemy.update(t, [ship]);
            });
            purgeEnemies(enemies);
            if (enemies.length === 0) {
                this.win = true;
                this.current = 'gameOver';
            }
            if (ship.HP === 0) {
                this.current = 'gameOver';
            }
            lt = now;
        },
        // game over state
        gameOver: function () {
            if (this.reset) {
                if (this.win) {
                    this.level += 1;
                    setupLevel(this);
                    this.current = 'game';
                } else {
                    this.current = 'init';
                }
            }
        },
        // tick method to be called in the main app loop
        tick: function () {
            this[this.current]();
        }
    };
}
    ());
