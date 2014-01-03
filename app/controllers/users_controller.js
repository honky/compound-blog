load('application');
before(loadUser, {
    only: ['show', 'edit', 'update']
});
action('new', function() {
    this.title = t('users_controller_client.action_new_title');
    this.user = new User;
    render();
});
action('login', function() {
    this.title =  t('users_controller_client.action_login_title');
    this.user = new User;
    flash('info', t('users_controller_client.action_login_furtherInfo'));
    render();
});
action('logout', function() {
    this.title = t('users_controller_client.action_logout_title');
    this.user = new User;
    req.session.user = undefined;
    flash('info', t('users_controller_client.action_logout_message'));
    //this.session.user = undefined;
    render();
});
action('change_language', function() {
    this.title = t('users_controller_client.action_change_language_title');
    this.user = new User;
    req.session.language = params.language;
    flash('info', t('users_controller_client.action_change_language_message'));
    setLocale(params.language);
    //if(this.session == undefined) { this.session = { }; }
    //this.session.language = req.query.language;
    //console.log("this.session.language: ",this.session.language);
/*
    console.log("req.session: ",req.session);
    console.log("req.body: ",req.body);
    console.log("req.query: ",req.query);
    console.log("req.session: ",req.session);
    console.log("req.user: ",req.user);
    */
    //if(req.user == undefined) { req.user = { }; }
    //req.user.locale = req.query.language;
    //maybe logged user needs to get his language updated here
    render();
});
action('verify_login', function() {
    this.title = t('users_controller_client.action_verify_login_title');
    this.user = new User;
    flash('info', t('users_controller_client.action_verify_login_message'));

        var userInDB = User.all({
            "where": {
                "name": req.body.name,
                "password": req.body.password
            }
        }, function(err, user) {
            if (err || !user) {
                if (!err && !user && params.format === 'json') {
                    redirect('login');
                }
                redirect('login');
            } else {
                if (user == undefined || user[0].length == 0) {
                    flash('error', t('users_controller_client.action_verify_login_error'));
                    redirect('login');
                    return;
                }
                if (req.session.user == undefined) {
                    req.session.user = {};
                }
                //setting session values
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
                    flash('error', t('users_controller_client.action_create_error'));
                    render('new', {
                        user: user,
                        title: t('users_controller_client.action_new_title')
                    });
                } else {
                    flash('info', t('users_controller_client.action_create_success'));
                    redirect(path_to.users);
                }
            });
        });
    });
});
action(function index() {
    this.title = t('users_controller_client.action_index_title');
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
    this.title = t('users_controller_client.action_show_title');
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
    this.title = t('users_controller_client.action_edit_title');
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
    this.title = t('users_controller_client.action_update_title');
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
                    flash('info', t('users_controller_client.action_update_success'));
                    redirect(path_to.user(user));
                } else {
                    flash('error', t('users_controller_client.action_update_error'));
                    render('edit');
                }
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