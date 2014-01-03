module.exports = function(compound, Page) {
	// define Page here
	var marked = require('marked');

	Page.prototype.content_formated = function ()
	{
		return marked(this.content);
	}
};