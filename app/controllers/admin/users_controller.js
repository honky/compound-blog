load('application');
before(loadUser, {
    only: ['show', 'edit', 'update', 'destroy']
});

before(use('adminRequired'));

action('new', function() {
    this.title = 'New user';
    this.user = new User;
    render();
});
action('login', function() {
    this.title = 'Login';
    this.user = new User;
    flash('info', 'Please provide further information to login.');
    //console.warn("somebody is trying to login!");
    //console.log(req);
    render();
});
action('logout', function() {
    this.title = 'Logout';
    this.user = new User;
    req.session.user = undefined;
    //this.session.user = undefined;
    render();
});
action('change_language', function() {
    this.title = 'change_language';
    this.user = new User;
    req.session.language = params.language;
    setLocale(params.language);
    render();
});
action('verify_login', function() {
    this.title = 'verify_login';
    this.user = new User;

    var userInDB = User.all({
        "where": {
            "name": req.body.name,
            "password": req.body.password
        }
    }, function(err, user) {
        if (err || !user) {
            console.log("User found if!");
            if (!err && !user && params.format === 'json') {
                redirect('login');
            }
            redirect('login');
        } else {
            if (user == undefined || user[0].length == 0) {
                flash('error', "wrong credentials or user not found.");
                redirect('login');
                return;
            }
            if (req.session.user == undefined) {
                req.session.user = {};
            }
            req.session.user = user[0];
            req.session.user.language = user[0].language;
            render();
        }
    });
});
action(function create() {
    User.create(req.body.User, function(err, user) {
        respondTo(function(format) {
            format.json(function() {
                if (err) {
                    send({
                        code: 500,
                        error: user && user.errors || err
                    });
                } else {
                    send({
                        code: 200,
                        data: user.toObject()
                    });
                }
            });
            format.html(function() {
                if (err) {
                    flash('error', 'User can not be created');
                    render('new', {
                        user: user,
                        title: 'New user'
                    });
                } else {
                    flash('info', 'User created');
                    redirect(path_to.users);
                }
            });
        });
    });
});
action(function index() {
    this.title = 'Users index';
    User.all(function(err, users) {
        switch (params.format) {
            case "json":
                send({
                    code: 200,
                    data: users
                });
                break;
            default:
                render({
                    users: users
                });
        }
    });
});
action(function show() {
    this.title = 'User show';
    this.user = new User;
    switch (params.format) {
        case "json":
            send({
                code: 200,
                data: this.user
            });
            break;
        default:
            render();
    }
});
action(function edit() {
    this.title = 'User edit';
    switch (params.format) {
        case "json":
            send(this.user);
            break;
        default:
            render();
    }
});
action(function update() {
    var user = this.user;
    this.title = 'Edit user details';
    this.user.updateAttributes(body.User, function(err) {
        respondTo(function(format) {
            format.json(function() {
                if (err) {
                    send({
                        code: 500,
                        error: user && user.errors || err
                    });
                } else {
                    send({
                        code: 200,
                        data: user
                    });
                }
            });
            format.html(function() {
                if (!err) {
                    flash('info', 'User updated');
                    redirect(path_to.user(user));
                } else {
                    flash('error', 'User can not be updated');
                    render('edit');
                }
            });
        });
    });
});
action(function destroy() {
    this.user.destroy(function(error) {
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
                    flash('error', 'Can not destroy user');
                } else {
                    flash('info', 'User successfully removed');
                }
                send("'" + path_to.users + "'");
            });
        });
    });
});

function loadUser() {
    User.find(params.id, function(err, user) {
        if (err || !user) {
            if (!err && !user && params.format === 'json') {
                return send({
                    code: 404,
                    error: 'Not found'
                });
            }
            redirect(path_to.users);
        } else {
            this.user = user;
            next();
        }
    }.bind(this));
}