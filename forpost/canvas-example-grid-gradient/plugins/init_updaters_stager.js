gradient.load({

    initMethods: {
        updatersStager: function (obj, grad, i) {
            obj.objUpdaterIndex = u.mod(i, grad.objUpdaters.length);
        }

});
