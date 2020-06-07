var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.sections = function (ctx, spin) {

    var i = spin.secionIndeces.length,
    section;
    while (i--) {
        section = spin.sectionIndeces[i];
    }

};
