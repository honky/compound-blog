var express = require('express');

module.exports = function (compound) {
    var app = compound.app;

    app.configure('test', function () {
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

        /*
    	app.set('defaultLocale', 'en');
        app.enable('quiet');
        app.enable('view cache');
        app.enable('model cache');
        app.enable('eval cache');
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
        */
    });
};
