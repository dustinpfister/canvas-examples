stateMod.load({
    name: 'core-spritesheets',
    type: 'plugin',
    create : function(sm){

        // set up sheets array
        sm.sheets = [];

        // default code generated sprite sheet
        var defaultSheet = function(){
            var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
            canvas.width = 32;
            canvas.height = 32;
            ctx.translate(0.5, 0.5);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 32, 32);
            ctx.strokeStyle = 'lime';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.rect(0, 0, 31, 31);
            ctx.moveTo(0,0);
            ctx.lineTo(31, 31);
            ctx.moveTo(31, 0);
            ctx.lineTo(0, 31);
            ctx.stroke();
            return canvas;
        };

        // use whole image as one frame by default
        var defaultFrames = function(img){
            return [ 0, 0, img.width, img.height ];
        };

        // create a sprite sheet object
        sm.createSpriteSheetObj = function(img, name, frames, index){
            img = img === undefined ? defaultSheet() : img;
            index = index === undefined ? sm.sheets.length : index;
            frames = frames === undefined ? defaultFrames(img) : frames;
            name = name === undefined ? sm.sheets.length : name;
            sm.sheets[index] = {
                name: name,
                img: img,
                frames : frames
            };
        };

        // create a sprite object
        sm.createSpriteObj = function(sheetId, frame){
            return {
                sheet: sm.sheets[0],
                frame: 0,
                x: -12, // offset from dispObj.x and y
                y: -12
            };
        };

        // set up a 'default' sheet at index 0
        var img = defaultSheet();
        sm.createSpriteSheetObj(img, 'default', defaultFrames(img), 0);

        // set up sprites for sections
        sm.game.forSections(function(section){
            section.sprite = sm.createSpriteObj('default', 0);
        });

        // set up sprite for sun
        sm.game.sun.sprite = sm.createSpriteObj('default', 0);

    }
});