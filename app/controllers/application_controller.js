before('protect from forgery', function() {
	protectFromForgery('57b41767946asda921238e296d52cfa0fed709d927ff07');
	var locale = req.session ? (req.session.language ? req.session.language : "de" ) : 'en';
	console.log("setting locale: ",locale);
	setLocale(locale);
});

