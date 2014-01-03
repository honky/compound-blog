load('application');

before(use('adminRequired'));

before(loadPage, {
    only: ['show', 'edit', 'update', 'destroy']
});


action('new', function() {
    this.title = 'New page';
    this.page = new Page;
    render();
});

action(function create() {
    Page.create(req.body.Page, function(err, page) {
        respondTo(function(format) {
            format.json(function() {
                if (err) {
                    send({
                        code: 500,
                        error: page && page.errors || err
                    });
                } else {
                    send({
                        code: 200,
                        data: page.toObject()
                    });
                }
            });
            format.html(function() {
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


action(function top5() {
    this.title = 'Pages Top5';
    console.log(params);
    flash("info", JSON.stringify(params.language));
    flash("info", JSON.stringify(req.body));

    Page.all({
        "order": "created desc",
        "where": {
            "language": "de"
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

action(function edit() {
    this.title = 'Page edit';
    switch (params.format) {
    case "json":
        send(this.page);
        break;
    default:
        render();
    }
});

action(function update() {
    var page = this.page;
    this.title = 'Edit page details';
    this.page.updateAttributes(body.Page, function(err) {
        respondTo(function(format) {
            format.json(function() {
                if (err) {
                    send({
                        code: 500,
                        error: page && page.errors || err
                    });
                } else {
                    send({
                        code: 200,
                        data: page
                    });
                }
            });
            format.html(function() {
                if (!err) {
                    flash('info', 'Page updated');
                    redirect(path_to.page(page));
                } else {
                    flash('error', 'Page can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.page.destroy(function(error) {
        respondTo(function(format) {
            format.json(function() {
                if (error) {
                    send({
                        code: 500,
                        error: error
                    });
                } else {
                    send({
                        code: 200
                    });
                }
            });
            format.html(function() {
                if (error) {
                    flash('error', 'Can not destroy page');
                } else {
                    flash('info', 'Page successfully removed');
                }
                send("'" + path_to.pages + "'");
            });
        });
    });
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
            next();
        }
    }.bind(this));
}