load('application');

before(loadPost, {
    only: ['show']
});

action(function index() {
    this.title = 'Posts index';
    Post.all(function(err, posts) {
        switch (params.format) {
            case "json":
                send({
                    code: 200,
                    data: posts
                });
                break;
            default:
                render({
                    posts: posts
                });
        }
    });
});

action(function top() {
    this.title = 'Posts Top5';
    console.log(params);

    var language2use = (req.session.language) ? req.session.language : "de";

    Post.all({
        "order": "created desc",
        "where": {
            "language": language2use
        }
    }, function(err, posts) {
        switch (params.format) {
            case "json":
                send({
                    code: 200,
                    data: posts
                });
                break;
            default:
                render({
                    posts: posts
                });
        }
    });
});

action(function show() {
    this.title = 'Post show';
    switch (params.format) {
        case "json":
            send({
                code: 200,
                data: this.post
            });
            break;
        default:
            render();
    }
});

function loadPost() {
    Post.find(params.id, function(err, post) {
        if (err || !post) {
            if (!err && !post && params.format === 'json') {
                return send({
                    code: 404,
                    error: 'Not found'
                });
            }
            redirect(path_to.posts);
        } else {
            this.post = post;
            Comment.all({
                "where": {
                    "post_id": post.id
                }
            }, function(err, result) {
                console.log("result", result);
                post.comments_fetched = result;
                next();
            });
            next();
        }
    }.bind(this));
}