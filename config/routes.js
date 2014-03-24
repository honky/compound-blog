exports.routes = function(map) {

	//landing page
	map.root('posts#top');

	map.resources('posts', {
		only: ["index", "show", "top"]
	});

	map.resources('comments', {
		only: ["index", "show", "new"]
	});

	map.resources('pages', function(page) {
		page.all('/pages/top', 'pages#top', {
			collection: true
		});
		page.resources('comments', {
			only: ["index", "show"]
		});
	});

	map.resources('users');
	/*{
		only: ["index", "show", "signup","update", "login", "logout", "new", "delete", "edit", "change_language"]
	}*/
	// Generic routes. Add all your routes below this line
	// feel free to remove generic routes
	// PP not used, pot. issue + probably not compatible to login stuff	
	//map.all(':controller/:action');
	//map.all(':controller/:action/:id');
	map.all('signup', 'users#new');
	map.all('login', 'users#login', {
		collection: true
	});
	map.all('logout', 'users#logout', {
		collection: true
	});
	map.all('verify_login', 'users#verify_login', {
		collection: true
	});
	map.all('change_language/:language', 'users#change_language', {
		collection: true
	});
	map.all('pages_top', 'pages#top', {
		collection: true
	});
	map.all('posts_top', 'posts#top', {
		collection: true
	});

	map.namespace('admin', function(admin) {
		admin.resources('users');
		admin.resources('pages');
		admin.resources('posts');
		admin.resources('comments');
		admin.root("pages#show");
	});
	/*
	map.namespace('admin', function (admin) {
        admin.resources('pages', {except: ['show']}, function (page) {
			map.resources('users');
        });
    });
	*/
};