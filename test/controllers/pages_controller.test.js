var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function PageStub () {
    return {
        page_id: '',
        title: '',
        teaser: '',
        content: '',
        language: '',
        created: '',
        createdBy: '',
        modified: '',
        modifiedBy: '',
        isPublic: '',
        isRegisteredOnly: ''
    };
}

describe('PageController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /pages/new
     * Should render pages/new.ejs
     */
    it('should render "new" template on GET /pages/new', function (done) {
        request(app)
        .get('/pages/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/pages\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /pages
     * Should render pages/index.ejs
     */
    it('should render "index" template on GET /pages', function (done) {
        request(app)
        .get('/pages')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/pages\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /pages/:id/edit
     * Should access Page#find and render pages/edit.ejs
     */
    it('should access Page#find and render "edit" template on GET /pages/:id/edit', function (done) {
        var Page = app.models.Page;

        // Mock Page#find
        Page.find = sinon.spy(function (id, callback) {
            callback(null, new Page);
        });

        request(app)
        .get('/pages/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Page.find.calledWith('42').should.be.true;
            app.didRender(/pages\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /pages/:id
     * Should render pages/index.ejs
     */
    it('should access Page#find and render "show" template on GET /pages/:id', function (done) {
        var Page = app.models.Page;

        // Mock Page#find
        Page.find = sinon.spy(function (id, callback) {
            callback(null, new Page);
        });

        request(app)
        .get('/pages/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Page.find.calledWith('42').should.be.true;
            app.didRender(/pages\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /pages
     * Should access Page#create when Page is valid
     */
    it('should access Page#create on POST /pages with a valid Page', function (done) {
        var Page = app.models.Page
        , page = new PageStub;

        // Mock Page#create
        Page.create = sinon.spy(function (data, callback) {
            callback(null, page);
        });

        request(app)
        .post('/pages')
        .send({ "Page": page })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Page.create.calledWith(page).should.be.true;

            done();
        });
    });

    /*
     * POST /pages
     * Should fail when Page is invalid
     */
    it('should fail on POST /pages when Page#create returns an error', function (done) {
        var Page = app.models.Page
        , page = new PageStub;

        // Mock Page#create
        Page.create = sinon.spy(function (data, callback) {
            callback(new Error, page);
        });

        request(app)
        .post('/pages')
        .send({ "Page": page })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Page.create.calledWith(page).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /pages/:id
     * Should redirect back to /pages when Page is valid
     */
    it('should redirect on PUT /pages/:id with a valid Page', function (done) {
        var Page = app.models.Page
        , page = new PageStub;

        Page.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/pages/1')
        .send({ "Page": page })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/pages/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });

    /*
     * PUT /pages/:id
     * Should not redirect when Page is invalid
     */
    it('should fail / not redirect on PUT /pages/:id with an invalid Page', function (done) {
        var Page = app.models.Page
        , page = new PageStub;

        Page.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/pages/1')
        .send({ "Page": page })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * DELETE /pages/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Page on DELETE /pages/:id');

    /*
     * DELETE /pages/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Page on DELETE /pages/:id if it fails');
});
