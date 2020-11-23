stateMod.load({
    name: 'core-spritesheets',
    type: 'plugin',
    create : function(sm){

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
        };

        sm.sheets = [];
        sm.createSpriteSheetObj = function(img, sheetName, frames, index){
            img = img === undefined ? defaultSheet() : img;
            index = index === undefined ? sm.sheets.length : index;
            frames = frames === undefined ? defaultFrames(img) : frames;
            sheetName = sheetName === undefined ? sm.sheets.length : sheetName;
        }
    }
});