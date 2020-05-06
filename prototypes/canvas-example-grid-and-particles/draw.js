var draw = (function () {

    return {

        // draw background
        background: function (state, style) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = style || 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

}
    ());
