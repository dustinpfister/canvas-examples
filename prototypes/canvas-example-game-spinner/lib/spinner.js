var spinner = (function () {

    return {

        // create a spinner state object
        create: function (opt) {
            opt = opt || {};
            return {
                RPS: : {
                    current: 0,
                    start: 6,
                    lossPerSecond: 1
                },
                radian: 0,
                sections: [1, 2, 3, 4, 5],
                sectionIndexs: [0, 1, 2, 3, 4]
            }
        },
		
		// start spinning a spinner state object
		startSpin: function(){
			
			
		};

    }

}
    ());
