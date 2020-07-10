var game = (function () {

    return {
        // create state
        create: function (opt) {
            opt = opt || {};
            var state = {
                canvas: opt.canvas,  // must give canvas
                ctx: opt.canvas.getContext('2d')
            };
            return state;
        }
    }

}
    ());
