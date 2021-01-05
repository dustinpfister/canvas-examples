var forFrame = (function(){

    var api = {};

    // create a main ff object
    api.create = function(opt){
        var ff = {
            frame: 0,
            maxFrame: opt.maxFrame || 50,
            forFrame: opt.forFrame || function(){}
        };
        return ff;
    };

}());