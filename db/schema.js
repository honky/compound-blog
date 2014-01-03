/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/
var Page = describe('Page', function() {
    property('page_id', {
        type: String,
        index: true
    });
    property('title', String);
    property('teaser', String);
    property('content', String);
    property('language', String);
    property('created', {
        type: Date,
        default: function() {
            if (this.created == undefined) {
                return new Date
            }
        }
    });
    property('createdBy', String);
    property('modified', {
        type: Date,
        default: function() {
            return new Date
        }
    });
    property('modifiedBy', String);
    property('isPublic', Boolean);
    property('isRegisteredOnly', Boolean);
    set('restPath', pathTo.pages);
});
var User = describe('User', function() {
    property('user_id', {
        type: String,
        index: true
    });
    property('name', String);
    property('email', {
        type: String,
        limit: 150
    }, { index: true });
    property('password', String, { index: true });
    property('language', String, { index: true });
    property('created', {
        type: Date,
        default: function() {
            if (this.created == undefined) {
                return new Date
            }
        }
    });
    property('createdBy', String);
    property('modified', {
        type: Date,
        default: function() {
            return new Date
        }
    });
    property('modifiedBy', String);
    property('isAdmin', Boolean, {
        default: false
    });
    property('isActivated', Boolean, {
        default: true
    });
    set('restPath', pathTo.users);
});