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
            ctx.rect(0, 0, 32, 32);
            ctx.moveTo(0,0);
            ctx.lineTo(32, 32);
            ctx.moveTo(32, 0);
            ctx.lineTo(0, 32);
            ctx.stroke();
            return canvas;
        };

        // use whole image as one frame by default
        var defaultFrames = function(img){
            return [ 0, 0, img.width, img.height ];
        };

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

        // set up a 'default' sheet at index 0
        var img = defaultSheet();
        sm.createSpriteSheetObj(img, 'default', defaultFrames(img), 0);
        console.log(sm.sheets);

    }
});