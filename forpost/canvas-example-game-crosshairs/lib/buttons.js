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
        if (button.type === 'upgrade') {
            button.onUpgrade = opt.onUpgrade || function () {};
            button.onDowngrade = opt.onDowngrade || function () {};
        }
    };
    // what to do before a button click for each type
    var beforeOnClick = {
        basic: function () {},
        options: function (button, api, point) {
            button.currentOption += 1;
            button.currentOption = button.currentOption >= button.options.length ? 0 : button.currentOption;
        },
        toggle: function (button, api, point) {
            button.bool = !button.bool;
        },
        upgrade: function (button, api, point) {
            if (point.y < button.y) {
                button.onUpgrade(button, api, point);
            }
            if (point.y > button.y) {
                button.onDowngrade(button, api, point);
            }
        }
    };
    // what to do after a click for each type
    var afterOnClick = {
        basic: function () {},
        options: function () {},
        toggle: function (button, api, point) {
            if (button.bool) {
                button.onActive(button, api, point);
            } else {
                button.onInactive(button, api, point);
            }
        },
        upgrade: function () {}
    };

    // the Public API

    var api = {};

    // create a new Button
    api.create = function (opt) {
            opt = opt || {};
            var button = {
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                r: opt.r === undefined ? 16 : opt.r,
                label: opt.label || '',
                info: opt.info || '',
                type: opt.type || 'basic',
                data: opt.data || {},
                frame: {
                    state: 'in',
                    frame: 0,
                    maxFrame: opt.maxFrame || 30,
                    FPS: 24
                },
                onClick: opt.onClick || function () {}
            };
            setupType(button, opt);
            return button;
    };

    // check the given button collection
    api.pointerCheckCollection = function (collection, point, gameAPI) {
            var keys = Object.keys(collection),
            i = keys.length,
            button,
            d;
            while (i--) {
                button = collection[keys[i]];
                d = utils.distance(point.x, point.y, button.x, button.y);
                if (d < button.r) {
                    beforeOnClick[button.type](button, gameAPI, point);
                    button.onClick(button, gameAPI, point);
                    afterOnClick[button.type](button, gameAPI, point)
                }
            }
    };

    // update a single button
    api.update = function(button, secs, api){
        //console.log(button.type);
    };

    // update a button collection
    api.updateCollection = function(collection, secs, gameAPI){

        var keys = Object.keys(collection),
        i = keys.length;
        while (i--) {
            api.update(collection[keys[i]], secs, gameAPI);
        }

    };

    return api;

}
    ());
