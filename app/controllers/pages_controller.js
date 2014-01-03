load('application');

before(loadPage, {
    only: ['show']
    });

action('new', function () {
    this.title = 'New page';
    this.page = new Page;
    render();
});

action(function create() {
    Page.create(req.body.Page, function (err, page) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: page && page.errors || err});
                } else {
                    send({code: 200, data: page.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Page can not be created');
                    render('new', {
                        page: page,
                        title: 'New page'
                    });
                } else {
                    flash('info', 'Page created');
                    redirect(path_to.pages);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Pages index';
    Page.all(function (err, pages) {
        switch (params.format) {
            case "json":
                send({code: 200, data: pages});
                break;
            default:
                render({
                    pages: pages
                });
        }
    });
});


action(function top5() {
    this.title = 'Pages Top5';
    console.log(params);
    
    var language2use = (req.session.language) ? req.session.language : "pl"; 

    Page.all({ "order":"created desc", "where" : { "language" : language2use } }, function (err, pages) {
        switch (params.format) {
            case "json":
                send({code: 200, data: pages});
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
    switch(params.format) {
        case "json":
            send({code: 200, data: this.page});
            break;
        default:
            render();
    }
});

function loadPage() {
    Page.find(params.id, function (err, page) {
        if (err || !page) {
            if (!err && !page && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.pages);
        } else {
            this.page = page;
            next();
        }
    }.bind(this));
}
