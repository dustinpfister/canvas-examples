var buttonMod = (function () {

    // setup a button object depending on type
    var setupType = function (button, opt) {
        // setup for 'options' type
        if (button.type === 'options') {
            button.options = opt.options || [];
            button.currentOption = 0;
        }
    };

    return {

        // create a single button
        create: function (opt) {
            opt = opt || {};
            var button = {
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                r: opt.r === undefined ? 16 : opt.r,
                label: opt.label || '',
                type: opt.type || 'basic'
            };
            setupType(button, opt);
            return button;
        },

        // check the given button collection
        pointerCheckCollection: function (collection) {
            var keys = Object.keys(collection),
            i = keys.length,
            button;
            while (i--) {
                button = collection[keys[i]];
            }
        }
    };
}
    ());
