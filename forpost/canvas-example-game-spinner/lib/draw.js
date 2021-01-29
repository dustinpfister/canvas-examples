var draw = (function () {

    var api = {};

    // public draw background
    api.background = function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    var getSectionRadian = function (spin, i) {
        return Math.PI * 2 / spin.sectionIndices.length * i;
    };

    // public draw sections
    api.sections = function (ctx, spin) {
        var i = 0,
        r,
        len = spin.sectionIndices.length,
        sectionIndex,
        section;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        while (i < len) {
            sectionIndex = spin.sectionIndices[i];
            section = spin.sections[sectionIndex];
            var r1 = getSectionRadian(spin, i),
            r2 = getSectionRadian(spin, i + 1),
            x1 = spin.cx + Math.cos(r1) * 64,
            y1 = spin.cy + Math.sin(r1) * 64;
            ctx.beginPath();
            ctx.moveTo(spin.cx, spin.cy);
            ctx.lineTo(x1, y1);
            ctx.arc(spin.cx, spin.cy, 64, r1, r2);
            ctx.stroke();
            i += 1;
        }
    };

    // public draw arrow
    api.arrow = function (ctx, spin) {
        var x = spin.cx + Math.cos(spin.radian) * 64,
        y = spin.cy + Math.sin(spin.radian) * 64;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(spin.cx, spin.cy);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    // draw info
    api.info = function (ctx, spin) {
        var x = spin.cx - 64,
        y = spin.cy + 64,
        section = spin.currentSection;
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.fillText('radian: ' + spin.radian.toFixed(2), x, y + 20);
        ctx.fillText('section: ' + section, x, y + 30);
    };

    api.ver = function (ctx, canvas, spin) {
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font = '10px arial';
        ctx.textAlign = 'left';
        ctx.fillText('v' + spin.ver, 5, canvas.height - 15);
    };

    return api;

}
    ());
