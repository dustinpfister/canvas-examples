var game = (function () {

    var centerPlayer = function (state) {
        var pa = state.playArea,
        p = state.player;
        p.x = pa.x + pa.w / 2 - p.w / 2;
        p.y = pa.y + pa.h / 2 - p.h / 2;
    };

    var createState = function (opt) {
        opt = opt || {};
        var state = {
            canvas: opt.canvas,
            ctx: opt.canvas.getContext('2d'),
            board: {
                x: 16,
                y: 16,
                w: 128,
                h: 192
            },
            playArea: {
                x: 16,
                y: 144,
                w: 128,
                h: 64
            }
        };
        state.player = {
            x: 0,
            y: 0,
            w: 16,
            h: 16
        };
        centerPlayer(state);
        return state;
    };

    return {
        create: createState
    };

}
    ());
