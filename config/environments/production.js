var express = require('express');

module.exports = function (compound) {
    var app = compound.app;

    app.configure('production', function () {
    	app.set('defaultLocale', 'en');
        app.enable('eval cache');
        app.enable('quiet');
        app.enable('merge javascripts');
        app.enable('merge stylesheets');
        app.disable('assets timestamps');
        app.set('translationMissing', 'default');
        app.use(express.errorHandler());
    });
};
