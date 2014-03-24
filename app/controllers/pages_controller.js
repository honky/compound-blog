load('application');
before(loadPage, {
    only: ['show']
});
action(function index() {
    this.title = 'Pages index';
    Page.all(function(err, pages) {
        switch (params.format) {
            case "json":
                send({
                    code: 200,
                    data: pages
                });
                break;
            default:
                render({
                    pages: pages
                });
        }
    });
});
action(function top() {
    this.title = 'Pages Top';
    var language2use = (req.session.language) ? req.session.language : "de";
    Page.all({
        "order": "created desc",
        "where": {
            "language": language2use
        }
    }, function(err, pages) {
        switch (params.format) {
            case "json":
                send({
                    code: 200,
                    data: pages
                });
                break;
            default:
                render({
                    pages: pages
                });
        }
    });
});
action(function show() {
    this.title = 'Page show';
    switch (params.format) {
        case "json":
            send({
                code: 200,
                data: this.page
            });
            break;
        default:
            render();
    }
});

function loadPage() {
    Page.find(params.id, function(err, page) {
        if (err || !page) {
            if (!err && !page && params.format === 'json') {
                return send({
                    code: 404,
                    error: 'Not found'
                });
            }
            redirect(path_to.pages);
        } else {
            this.page = page;
            Comment.all({
                "where": {
                    "page_id": page.id
                }
            }, function(err, result) {
                page.comments_fetched = result;
                done();
            });
            Tag.all({
                "where": {
                    "page_id": page.id
                }
            }, function(err, result) {
                page.tags_fetched = result;
                done();
            });
            Category.all({
                "where": {
                    "page_id": page.id
                }
            }, function(err, result) {
                page.categories_fetched = result;
                next();
            });
        }
    }.bind(this));
}