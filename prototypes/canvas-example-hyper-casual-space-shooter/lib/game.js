var gameMod = (function(){
    
    var api = {};

    api.create = function(plugObj){
        return {
            ship: { 
                x: 0, // ship position relative to map position
                y: 0,
            },
            map: { // map position
                x: -16,
                y: -16,
                radian: Math.PI / 180 * 45,
                pps: 64
            }
        };
    };
    // return the Public API
    return api;
}());