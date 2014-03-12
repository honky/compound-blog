var app, compound, request = require('supertest'),
    sinon = require('sinon');

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
    it('should render "new" template on GET /admin/users/new', function(done) {
        request(app)
            .get('/admin/users/new')
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                app.didRender(/admin\/users\/new\.ejs$/i).should.be.true;
                done();
            });
    });

    /*
     * GET /admin/users
     * Should render users/index.ejs
     */
    it('should render "index" template on GET /admin/users', function(done) {
        request(app)
            .get('/admin/users')
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                app.didRender(/admin\/users\/index\.ejs$/i).should.be.true;
                done();
            });
    });

    /*
     * GET /users
     * Should render users/index.ejs
     */
    it('should render "index" template on GET /users', function(done) {
        request(app)
            .get('/admin/users')
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                app.didRender(/users\/index\.ejs$/i).should.be.true;
                done();
            });
    });



    /*
     * DELETE /admin/users/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a User on DELETE /admin/users/:id');

    /*
     * DELETE /admin/users/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a User on DELETE /admin/users/:id if it fails');
});