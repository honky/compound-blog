before('protect from forgery', function() {
	protectFromForgery('57b41767946asda921238e296d52cfa0fed709d927ff07');
	var locale = req.session ? (req.session.language ? req.session.language : "de") : 'en';
	req.session.language = locale;
	//console.log("setting locale: ", locale);
	setLocale(locale);
});


publish('userRequired', userRequired);

function userRequired() {

	var isUser = false;
	if (req.session) {
		if (req.session.user) {
			console.log(req.session.user);
			if (req.session.user == true) {
				isUser = true;
			}
		}
	}

	if (!isUser) {
		flash("error", "please login with user first.");
		redirect("login");
	}
	next();
}


publish('adminRequired', adminRequired);

function adminRequired() {

	var isAdmin = false;

	if ('test' === process.env.NODE_ENV) { //is this an security issue?
		isAdmin = true;
		next();
	}

	if (req.session) {
		if (req.session.user) {
			console.log(req.session.user);
			if (req.session.user.isAdmin == true) {
				isAdmin = true;
			}
		}
	}

	if (!isAdmin) {
		flash("error", "please login with admin user first.");
		redirect("login");
	}
	next();
}