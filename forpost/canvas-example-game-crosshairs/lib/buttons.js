var buttonMod = (function () {

    // setup a button object depending on type
    var setupType = function (button, opt) {
        // setup for 'options' type
        if (button.type === 'options') {
            button.options = opt.options || [];
            button.currentOption = 0;
            button.label = button.options[0];
        }
        // setup a 'toggle' type
        if (button.type === 'toggle') {
            button.bool = opt.bool || false;
            button.onActive = opt.onActive || function () {};
            button.onInactive = opt.onInactive || function () {};
        }
        // setup a 'upgrade' type
        if (button.type === 'upgrade') {}
    };

    var beforeOnClick = {
        basic: function (button, api, point) {},
        options: function (button, api, point) {
            button.currentOption += 1;
            button.currentOption = button.currentOption >= button.options.length ? 0 : button.currentOption;
        },
        toggle: function (button, api, point) {
            button.bool = !button.bool;
        },
        upgrade: function (button, api, point) {}
    };

    var afterOnClick = {
        basic: function (button, api, point) {},
        options: function (button, api, point) {},
        toggle: function (button, api, point) {
            if (button.bool) {
                button.onActive(button, api, point);
            } else {
                button.onInactive(button, api, point);
            }
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
                type: opt.type || 'basic',
                onClick: opt.onClick || function () {}
            };
            setupType(button, opt);
            return button;
        },

        // check the given button collection
        pointerCheckCollection: function (collection, point, api) {
            var keys = Object.keys(collection),
            i = keys.length,
            button,
            d;
            while (i--) {
                button = collection[keys[i]];
                d = utils.distance(point.x, point.y, button.x, button.y);
                if (d < button.r) {
                    beforeOnClick[button.type](button, api, point);
                    button.onClick(button, api, point);
                    afterOnClick[button.type](button, api, point)
                }
            }
        }
    };
}
    ());
