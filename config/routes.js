exports.routes = function(map) {
/*
	map.resources('users', function(user){
    user.all('login', 'users#login'); 
    user.all('login2', 'users#login', {collection: true});              // /users/:user_id/avatar
    });
	*/
	map.resources('pages',{only: ["index","show","top5"]});
	map.resources('users', {only: ["index","show","signup","login","logout","new","delete","edit","change_language"]});

	// Generic routes. Add all your routes below this line
	// feel free to remove generic routes
	
	//map.all(':controller/:action');
	//map.all(':controller/:action/:id');

	map.all('signup', 'users#new');
	map.all('login', 'users#login', {collection: true});
	map.all('logout', 'users#logout', {collection: true});
	map.all('verify_login', 'users#verify_login', {collection: true});
	map.all('change_language/:language', 'users#change_language', {collection: true});

	map.all('pages/top5', 'pages#top5', {collection: true});
	map.all('top5', 'pages#top5', {collection: true});

	map.root('pages#top5');

	map.namespace('admin', function (admin) {
    	admin.resources('users');
    	admin.resources('pages');
    	admin.root('users#show');
	});

	
	/*
	map.namespace('admin', function (admin) {
        admin.resources('pages', {except: ['show']}, function (page) {
			map.resources('users');
        });
    });
	*/
};