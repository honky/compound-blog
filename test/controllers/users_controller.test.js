var app, compound, request = require('supertest'),
    sinon = require('sinon');
var server = request.agent('http://localhost:8888');

function UserStub() {
    return {
        user_id: '',
        name: '',
        email: '',
        password: '',
        language: '',
        created: '',
        createdBy: '',
        modified: '',
        modifiedBy: '',
        isAdmin: '',
        isActivated: ''
    };
}
describe('UserController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });

    });

    /*
     * GET /admin/users/new
     * Should render users/new.ejs
     */
     it('2 - should render "index" template on GET /admin/users', function(done) {
        request(app).get('/admin/users').end(function(err, res) {
            if (err) return done(err);
            done()
        });
    });
    /*
     * GET /admin/users
     * Should render users/index.ejs
     */
    it('2 - should render "index" template on GET /users', function(done) {
        request(app).get('/users').end(function(err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/users\/index\.ejs$/i).should.be.true;
            done();
        });
    });
    /*
     * GET /users
     * Should render users/index.ejs
     */
    it('3 - should render "index" template on GET /users', function(done) {
        request(app).get('/users').expect(200).end(function(err, res) {
            if (err) return done(err);
            done()
        });
    });

    /*
     * GET /admin/users/:id/edit
     * Should access User#find and render users/edit.ejs
     */
    it('should access User#find and render "edit" template on GET /admin/users/:id/edit', function (done) {
        var User = app.models.User;

        // Mock User#find
        User.find = sinon.spy(function (id, callback) {
            callback(null, new User);
        });

        request(app)
        .get('/admin/users/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            User.find.calledWith('42').should.be.true;
            app.didRender(/admin\/users\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /admin/users/:id
     * Should render users/index.ejs
     */
    it('should access User#find and render "show" template on GET /admin/users/:id', function (done) {
        var User = app.models.User;

        // Mock User#find
        User.find = sinon.spy(function (id, callback) {
            callback(null, new User);
        });

        request(app)
        .get('/admin/users/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            User.find.calledWith('42').should.be.true;
            app.didRender(/admin\/users\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /users/:id
     * Should render users/index.ejs
     */
    it('should access User#find and render "show" template on GET /users/:id', function (done) {
        var User = app.models.User;

        // Mock User#find
        User.find = sinon.spy(function (id, callback) {
            callback(null, new User);
        });

        request(app)
        .get('/users/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            User.find.calledWith('42').should.be.true;
            app.didRender(/users\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /admin/users
     * Should access User#create when User is valid
     */
    it('should access User#create on POST /admin/users with a valid User', function (done) {
        var User = app.models.User
        , user = new UserStub;

        // Mock User#create
        User.create = sinon.spy(function (data, callback) {
            callback(null, user);
        });

        request(app)
        .post('/admin/users')
        .send({ "User": user })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            User.create.calledWith(user).should.be.true;

            done();
        });
    });

    /*
     * POST /admin/users
     * Should fail when User is invalid
     */
    it('should fail on POST /admin/users when User#create returns an error', function (done) {
        var User = app.models.User
        , user = new UserStub;

        // Mock User#create
        User.create = sinon.spy(function (data, callback) {
            callback(new Error, user);
        });

        request(app)
        .post('/admin/users')
        .send({ "User": user })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            User.create.calledWith(user).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /admin/users/:id
     * Should redirect back to /admin/users when User is valid
     
    it('should redirect on PUT /admin/users/:id with a valid User', function (done) {
        var User = app.models.User
        , user = new UserStub;

        User.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/admin/users/1')
        .send({ "User": user })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/admin/users/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });*/

    /*
     * PUT /admin/users/:id
     * Should not redirect when User is invalid
     */
    it('should fail / not redirect on PUT /admin/users/:id with an invalid User', function (done) {
        var User = app.models.User
        , user = new UserStub;

        User.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/admin/users/1')
        .send({ "User": user })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });
});
