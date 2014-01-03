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
    }, {
        index: true
    });
    property('password', String, {
        index: true
    });
    property('language', String, {
        index: true
    });
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
var Comment = describe('Comment', function() {
    property('title', String);
    property('content', String);
    property('created', {
        type: Date,
        default: function() {
            if (this.created == undefined) {
                return new Date;
            }
        }
    });
    property('createdBy', String);
    property('modified', {
        type: Date,
        default: function() {
            return new Date;
        }
    });
    property('modifiedBy', String);
    property('isPublic', Boolean, {
        default: function() {
            return true;
        }
    });
    set('restPath', pathTo.comments);
});
Page.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'page_id'
});
Comment.belongsTo(Page, {
    as: 'pages',
    foreignKey: 'page_id'
});
/*
User.hasMany(Page, {
    as: 'posts',
    foreignKey: 'userId'
});

Page.belongsTo(User, {
    as: 'author',
    foreignKey: 'userId'
});
*/
var Post = describe('Post', function() {
    property('title', String);
    property('teaser', String);
    property('content', String);
    property('createdAt', Date);
    property('createdBy', String);
    property('modifiedAt', Date);
    property('modifiedBy', String);
    property('isPublic', Boolean);
    property('isUserRequired', Boolean);
    set('restPath', pathTo.posts);
});
Post.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'post_id'
});
Comment.belongsTo(Post, {
    as: 'posts',
    foreignKey: 'post_id'
});
var Category = describe('Category', function() {
    property('name', String);
    property('color', String);
    set('restPath', pathTo.categories);
});
var Tag = describe('Tag', function() {
    property('name', String);
    property('color', String);
    set('restPath', pathTo.tags);
});
Page.hasMany(Tag, {
    foreignKey: 'page_id'
});
Tag.belongsTo(Page, {
    foreignKey: 'page_id'
});
Post.hasMany(Tag, {
    foreignKey: 'post_id'
});
Tag.belongsTo(Post, {
    foreignKey: 'post_id'
});
Page.hasMany(Category, {
    foreignKey: 'page_id'
});
Category.belongsTo(Page, {
    foreignKey: 'page_id'
});