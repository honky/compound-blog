module.exports = function(compound) {

    var express = require('express');
    var app = compound.app;

    app.configure(function() {
        app.use(express.static(app.root + '/public', {
            maxAge: 86400000
        }));
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        app.set('cssEngine', 'stylus');
        compound.loadConfigs(__dirname);
        app.use(express.bodyParser());
        app.use(express.cookieParser('cookiePferdGurkenSalatGruenBLauRosa1WunderBar11332!'));
        app.use(express.session({
            secret: 'sessionPferdGurkenSalatGruenBLauRosa1WunderBar11332!'
        }));
        app.use(express.methodOverride());
        app.use(app.router);
    });

};