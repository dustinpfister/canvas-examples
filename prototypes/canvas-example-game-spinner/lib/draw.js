var draw = (function () {
    var api = {};
    api.background = function (ctx, canvas) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    var getSectionRadian = function (spin, i) {
        return Math.PI * 2 / spin.sectionIndices.length * i;
    };

    api.sections = function (ctx, spin) {
        var i = 0,
        r,
        len = spin.sectionIndices.length,
        sectionIndex,
        section;
        ctx.strokeStyle = 'white';
        while (i < len) {
            sectionIndex = spin.sectionIndices[i];
            section = spin.sections[sectionIndex];
            r1 = getSectionRadian(spin, i);
            r2 = getSectionRadian(spin, i + 1);
            var x1 = spin.cx + Math.cos(r1) * 64,
            y1 = spin.cy + Math.sin(r1) * 64,
            x2 = spin.cx + Math.cos(r2) * 64,
            y2 = spin.cy + Math.sin(r2) * 64;
            ctx.beginPath();
            ctx.moveTo(spin.cx, spin.cy);
            ctx.lineTo(x1, y1);
            ctx.arc(spin.cx, spin.cy, 64, r1, r2);
            ctx.stroke();
            i += 1;
        }
    };

    return api;

}
    ());
