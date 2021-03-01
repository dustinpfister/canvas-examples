var sm = Machine('gamearea', 640, 480);

sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {
        var g = sm.game;
        g.ship = {
            x: sm.canvas.width / 2,
            y: sm.canvas.height / 2,
            heading: 0
        };
        g.userDown = false;
    },
    tick: function (sm) {

        var g = sm.game,
        ctx = sm.ctx;

        // set mode to nav conditions
        sm.currentMode = null;
        if (g.userDown) {
            if (new Date() - g.userDownST >= 1000) {
                sm.currentMode = 'nav';
            }
        }

        // draw
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillText(g.userDown, 10, 20);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(g.ship.x, g.ship.y, 5, 0, Math.PI * 2);
        ctx.stroke();

    },
    // global user pointer
    userPointer: {
        start: function (pt, sm, e) {
            sm.game.userDown = true;
            sm.game.userDownST = new Date();
        },
        end: function (pt, sm, e) {
            sm.game.userDown = false;
        }
    },
    // modes for this state
    modes: {
        nav: {
            // what to do for each tick, when nav mode is active
            tick: function (sm) {
                var g = sm.game,
                ship = g.ship;
                // move ship based on current heading
                ship.x += Math.cos(ship.heading) * 2;
                ship.y += Math.sin(ship.heading) * 2;
                // boundaries
                ship.x = ship.x < 0 ? sm.canvas.width : ship.x;
                ship.y = ship.y < 0 ? sm.canvas.height : ship.y;
                ship.x = ship.x > sm.canvas.width ? 0 : ship.x;
                ship.y = ship.y > sm.canvas.height ? 0 : ship.y;
            },
            // user pointer just for nav
            userPointer: {
                // mouse move event can change heading now
                move: function (pt, sm, e) {
                    var g = sm.game,
                    ship = g.ship;
                    ship.heading = Math.atan2(pt.y - ship.y, pt.x - ship.x);
                }
            }
        }

    }
});

sm.start();
