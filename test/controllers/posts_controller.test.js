var app, compound, request = require('supertest'),
    sinon = require('sinon');

function PostStub() {
    return {
        title: '',
        teaser: '',
        content: '',
        createdAt: '',
        createdBy: '',
        modifiedAt: '',
        modifiedBy: '',
        isPublic: '',
        isUserRequired: ''
    };
}

describe('PostController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /posts_top
     * Should render posts/top.ejs
     */
    it('should render "top" template on /posts_top', function(done) {
        request(app)
            .get('/posts_top')
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                app.didRender(/posts\/top\.ejs$/i).should.be.true;
                done();
            });
    });


    /*
     * GET /admin/posts/new
     * Should render posts/new.ejs
     */
    it('should render "new" template on GET /admin/posts/new', function(done) {
        request(app)
            .get('/admin/posts/new')
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                app.didRender(/admin\/posts\/new\.ejs$/i).should.be.true;
                done();
            });
    });

    /*
     * GET /posts
     * Should render posts/index.ejs
     */
    it('should render "index" template on GET /posts', function(done) {
        request(app)
            .get('/posts')
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                app.didRender(/posts\/index\.ejs$/i).should.be.true;
                done();
            });
    });

    /*
     * GET /admin/posts/:id/edit
     * Should access Post#find and render posts/edit.ejs
     */
    it('should access Post#find and render "edit" template on GET /admin/posts/:id/edit', function(done) {
        var Post = app.models.Post;

        // Mock Post#find
        Post.find = sinon.spy(function(id, callback) {
            callback(null, new Post);
        });

        request(app)
            .get('/admin/posts/42/edit')
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                Post.find.calledWith('42').should.be.true;
                app.didRender(/admin\/posts\/edit\.ejs$/i).should.be.true;

                done();
            });
    });

    /*
     * GET /admin/posts/:id
     * Should render posts/index.ejs
     */
    it('should access Post#find and render "show" template on GET /admin/posts/:id', function(done) {
        var Post = app.models.Post;

        // Mock Post#find
        Post.find = sinon.spy(function(id, callback) {
            callback(null, new Post);
        });

        request(app)
            .get('/admin/posts/42')
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                Post.find.calledWith('42').should.be.true;
                app.didRender(/admin\/posts\/show\.ejs$/i).should.be.true;

                done();
            });
    });

    /*
     * POST /posts
     * Should access Post#create when Post is valid
     */
    it('should access Post#create on POST /admin/posts with a valid Post', function(done) {
        var Post = app.models.Post,
            post = new PostStub;

        // Mock Post#create
        Post.create = sinon.spy(function(data, callback) {
            callback(null, post);
        });

        request(app)
            .post('/admin/posts')
            .send({
                "Post": post
            })
            .end(function(err, res) {
                res.statusCode.should.equal(302);
                Post.create.calledWith(post).should.be.true;

                done();
            });
    });

    /*
     * POST /posts
     * Should fail when Post is invalid
     */
    it('should fail on POST /posts when Post#create returns an error', function(done) {
        var Post = app.models.Post,
            post = new PostStub;

        // Mock Post#create
        Post.create = sinon.spy(function(data, callback) {
            callback(new Error, post);
        });

        request(app)
            .post('/admin/posts')
            .send({
                "Post": post
            })
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                Post.create.calledWith(post).should.be.true;

                app.didFlash('error').should.be.true;

                done();
            });
    });

    /*
     * PUT /admin/posts/:id
     * Should not redirect when Post is invalid
     */
    it('should fail / not redirect on PUT /admin/posts/:id with an invalid Post', function(done) {
        var Post = app.models.Post,
            post = new PostStub;

        Post.find = sinon.spy(function(id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function(data, cb) {
                    cb(new Error)
                }
            });
        });

        request(app)
            .put('/admin/posts/1')
            .send({
                "Post": post
            })
            .end(function(err, res) {
                res.statusCode.should.equal(200);
                app.didFlash('error').should.be.true;

                done();
            });
    });

    /*
     * DELETE /admin/posts/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Post on DELETE /admin/posts/:id');

    /*
     * DELETE /admin/posts/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Post on DELETE /admin/posts/:id if it fails');
});