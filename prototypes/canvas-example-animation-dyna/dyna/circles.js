dynaMod.load({
    name: 'circles',
    
    // create a model with the given options
    create : function(dynaOpt){
    },

    // an ff option object that can be used with forframe.js
    createFFOpt: function(ffOpt){
        var plug = this; // this should ref to this plugin object
        return {
            maxFrame: ffOpt.maxFrame,
            width: ffOpt.width,
            height: ffOpt.height,
            forFrame: function(ff, opt){
                var dynaOpt = {};
                dynaOpt.radian = utils.pi2 * ff.per;
                return plug.create(dynaOpt);
            }
        };
    },
    // the draw method
    draw: function(ff, ctx){
        
    }
});
