
(function () {
    // GAME MODE STATE
    var spawnSettingsButton = function(sm, setting, bx, actionStringPart, dispText, angle, poolKey){
        var actionString = 'set_modesetting_' + actionStringPart + '_' + setting.key;
        var button = stateMachine.spawnButton(sm, bx, actionString, dispText, angle, poolKey);
        button.data.setting = setting;
        return button;
    };
    var updateDisp = function(sm, button){
        var parts = button.data.action.split('_'),
        settingObj = button.data.setting,
        dispButton = stateMachine.getButtonByAction(sm.buttons, 'set_modesetting_current_' + settingObj.key);
        dispButton.data.disp = settingObj.disp + ' ' + sm.modeSettings[parts[3]];
    };
    var setModeProp = function(sm, button, value){
        var parts = button.data.action.split('_'),
        settingObj = button.data.setting,
        range = settingObj.range;
        // step modeProp
        modeProp = value;
        // wrap modeProp
        modeProp = modeProp < range[0] ? range[1]: modeProp;
        modeProp = modeProp > range[1] ? range[0]: modeProp;
        sm.modeSettings[parts[3]] = modeProp;
        updateDisp(sm, button);
    };
    // step mode prop helper
    var stepModeProp = function(sm, parts, button, dir){
        var modeProp = sm.modeSettings[parts[3]],
        settingObj = button.data.setting,
        range = settingObj.range;
        // step modeProp
        modeProp += 1 * dir;
        // wrap modeProp
        modeProp = dir === -1 && modeProp < range[0] ? range[1]: modeProp;
        modeProp = dir === 1 && modeProp > range[1] ? range[0]: modeProp;
        sm.modeSettings[parts[3]] = modeProp;
        updateDisp(sm, button);
    };
    stateMachine.load({
        key: 'gameMode',
        init: function (sm) {
            // default to whatever key sm.gameModeIndex is for gameMode
            sm.gameMode = Object.keys(gameMod.modes)[sm.gameModeIndex];
            var mode = gameMod.modes[sm.gameMode];
            if(mode.createBackground){
                mode.background = mode.createBackground(sm, mode);
            }
            // ref mode settings object in sm.modeSettingsCollection
            sm.modeSettings = sm.modeSettingsCollection[sm.gameMode];
            // create settings buttons
            mode.settings.forEach(function(setting, i){
                // down/up buttons
                var w = 64,
                h = 64,
                x = 8,
                y = 64 + 64 * i;
                spawnSettingsButton(sm, setting, {x: x, y: y, w: w, h : h}, 'down', '-');
                spawnSettingsButton(sm, setting, {x: x + w * 5, y: y, w: w, h : h}, 'up', '+');
                // setting disp
                w = 64 * 4;
                spawnSettingsButton(sm, setting, 
                  {x: x + 64 * 1, y: y, w: w, h : h}, 
                  'current', 
                   setting.disp + ' ' + sm.modeSettings[setting.key]);
            });
            // next mode button
            var w = 64,
            h = 64;
            stateMachine.spawnButton(sm, {x: sm.canvas.width - 80, y: 200, w: w, h: h}, 'set_mode_next', 'Next');
            // start game button
            var w = 250,
            h = 64;
            stateMachine.spawnButton(sm, {x: sm.canvas.width - 275, y: sm.canvas.height - 80, w: w, h: h}, 'start_game', 'Start');
            // back to title
            w = 125;
            stateMachine.spawnButton(sm, {x: sm.canvas.width - 150, y: 32, w: w, h: h}, 'start_title', 'Title');
            // current mode display Object
            var disp = stateMachine.spawnButton(sm, {x: 8, y: 8, w: 200, h: 32}, 'dispobj_currentMode', sm.gameMode, 0, 'dispObjects');
            disp.data.draw = function(ctx, obj){
                ctx.fillStyle = 'white';
                ctx.textBaseline = 'top';
                ctx.textAlign = 'left';
                ctx.font='50px arial';
                ctx.fillText(obj.data.disp, obj.x, obj.y);
            };
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            draw.buttonPool(ctx, sm.buttons, sm);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                var parts = button.data.action.split('_');
                if(button.data.action === 'start_game'){
                    stateMachine.startStateChangeTrans(sm, 'game');
                }
                if(button.data.action === 'start_title'){
                    stateMachine.startStateChangeTrans(sm, 'title');
                }
                if(parts[2] === 'current'){
                    var per = Math.floor(pos.x - button.x) / button.w,
                    rangeDelta = button.data.setting.range[1] - button.data.setting.range[0],
                    value = Math.floor(button.data.setting.range[0] + per * rangeDelta);
                    // set the mode prop
                    setModeProp(sm, button, value);
                }
                if(button.data.action === 'set_mode_next'){
                    sm.gameModeIndex += 1;
                    sm.gameModeIndex = utils.mod(sm.gameModeIndex, Object.keys(gameMod.modes).length);
                    stateMachine.startStateChangeTrans(sm, 'gameMode');
                }
                if(parts[0] === 'set'){
                    if(parts[2] === 'up'){
                        stepModeProp(sm, parts, button, 1);
                    }
                    if(parts[2] === 'down'){
                        stepModeProp(sm, parts, button, -1);
                    }
                }
            }
        }
    });
}());
