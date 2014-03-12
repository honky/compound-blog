var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function CommentStub () {
    return {
        title: '',
        content: '',
        createdAt: '',
        createdBy: '',
        modifiedAt: '',
        modifiedBy: '',
        isPublic: ''
    };
}

describe('CommentController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /admin/comments/new
     * Should render comments/new.ejs
     */
    it('should render "new" template on GET /admin/comments/new', function (done) {
        request(app)
        .get('/admin/comments/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/admin\/comments\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /comments
     * Should render comments/index.ejs
     */
    it('should render "index" template on GET /admin/comments', function (done) {
        request(app)
        .get('/admin/comments')
        .expect(200)
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/admin\/comments\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /admin/comments/:id/edit
     * Should access Comment#find and render comments/edit.ejs
     */
    it('should access Comment#find and render "edit" template on GET /admin/comments/:id/edit', function (done) {
        var Comment = app.models.Comment;

        // Mock Comment#find
        Comment.find = sinon.spy(function (id, callback) {
            callback(null, new Comment);
        });

        request(app)
        .get('/admin/comments/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Comment.find.calledWith('42').should.be.true;
            app.didRender(/admin\/comments\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /admin/comments/:id
     * Should render comments/index.ejs
     */
    it('should access Comment#find and render "show" template on GET /admin/comments/:id', function (done) {
        var Comment = app.models.Comment;

        // Mock Comment#find
        Comment.find = sinon.spy(function (id, callback) {
            callback(null, new Comment);
        });

        request(app)
        .get('/admin/comments/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Comment.find.calledWith('42').should.be.true;
            app.didRender(/admin\/comments\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /comments
     * Should access Comment#create when Comment is valid
     */
    it('should access Comment#create on POST /comments with a valid Comment', function (done) {
        var Comment = app.models.Comment
        , comment = new CommentStub;

        // Mock Comment#create
        Comment.create = sinon.spy(function (data, callback) {
            callback(null, comment);
        });

        request(app)
        .post('/admin/comments')
        .send({ "Comment": comment })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Comment.create.calledWith(comment).should.be.true;

            done();
        });
    });

    /*
     * POST /comments
     * Should fail when Comment is invalid
     */
    it('should fail on POST /comments when Comment#create returns an error', function (done) {
        var Comment = app.models.Comment
        , comment = new CommentStub;

        // Mock Comment#create
        Comment.create = sinon.spy(function (data, callback) {
            callback(new Error, comment);
        });

        request(app)
        .post('/admin/comments')
        .send({ "Comment": comment })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Comment.create.calledWith(comment).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /admin/comments/:id
     * Should redirect back to /comments when Comment is valid
     
    it('should redirect on PUT /admin/comments/:id with a valid Comment', function (done) {
        var Comment = app.models.Comment
        , comment = new CommentStub;

        Comment.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/admin/comments/1')
        .send({ "Comment": comment })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/admin/comments/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });*/

    /*
     * PUT /admin/comments/:id
     * Should not redirect when Comment is invalid
     */
    it('should fail / not redirect on PUT /admin/comments/:id with an invalid Comment', function (done) {
        var Comment = app.models.Comment
        , comment = new CommentStub;

        Comment.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/admin/comments/1')
        .send({ "Comment": comment })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * DELETE /admin/comments/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Comment on DELETE /admin/comments/:id');

    /*
     * DELETE /admin/comments/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Comment on DELETE /admin/comments/:id if it fails');
});
