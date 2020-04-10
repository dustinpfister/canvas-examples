var kaboom = (function () {

    return {

        createState: function () {
            return {
                score: 0,
                level: 1
            };
        },
		
		
		update: function(state){
			
			
		}

    }

}
    ());

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('gamearea').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
