stateMod.load({
    name: 'core-transitions',
    type: 'plugin',
    create : function(sm){
        console.log('core-transitions: create');
        // adds a sm.startTransition method
        sm.startTrans = function(opt){
            opt = opt || {};
            opt.newStateName = opt.newStateName || '';
            opt.data = opt.data || {};

            var trans = sm.state.trans;
            if(trans){
                trans.frame = 0;
                trans.secs = 0;
                trans.start(sm);
                trans.action = 'running';
                trans.newStateName = opt.newStateName;
                trans.data = opt.data;
            }
        }
    },
    update: function(sm, secs){
        // check if there is a trans object
        var trans = sm.state.trans;
        if(trans){
            // if so check if the state is 'running'
            if(trans.action === 'running'){
                trans.secs += secs;
                trans.per = trans.secs / trans.maxSecs;
                trans.per = trans.per > 1 ? 1 : trans.per;
                trans.frame = Math.round(trans.maxFrame * trans.per);
                // call update
                trans.update(sm, trans, trans.frame, trans.maxFrame, trans.per, trans.data);
                // end if trans.per === 1
                if(trans.per === 1){
                    trans.action = 'end';
                    trans.end(sm, trans);
                    if(trans.newStateName != ''){
                         sm.changeState(trans.newStateName);
                    }
                }
            }
        }
    }
});