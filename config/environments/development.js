var express = require('express');

module.exports = function (compound) {
    var app = compound.app;

    app.configure('development', function () {
        
    	app.set('defaultLocale', "en" );

        app.disable('eval cache');
        app.disable('model cache');
        app.disable('view cache');

        //app.enable('merge javascripts');
        //app.enable('merge stylesheets');
        
        app.enable('watch');
        app.enable('log actions');
        app.enable('env info');
        app.enable('force assets compilation');
        app.set('translationMissing', 'display');
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });
};
