var buttonMod = (function () {
    return {
        create: function (opt) {
            opt = opt || {};
            var button = {
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                r: opt.r === undefined ? 16 : opt.r,
                label: opt.label || '',
                type: opt.type || 'basic'
            };
            return button;
        }
    };
}
    ());
