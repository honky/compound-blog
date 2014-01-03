console.log('Seeding pages...');
var pages = [{
	title: 'title1',
	teaser: 'teaser1',
	content: 'content1',
	language: 'en',
	CreatedBy: 'Seeding',
	ModifiedBy: 'Seeding'
}, {
	title: 'title2',
	teaser: 'teaser2',
	content: 'content2',
	language: 'en',
	CreatedBy: 'Seeding',
	ModifiedBy: 'Seeding'
}, {
	title: 'title3',
	teaser: 'teaser3',
	content: 'content3',
	language: 'en',
	CreatedBy: 'Seeding',
	ModifiedBy: 'Seeding'
}, {
	title: 'title4',
	teaser: 'teaser4',
	content: 'content4',
	language: 'de',
	CreatedBy: 'Seeding',
	ModifiedBy: 'Seeding'
}, {
	title: 'title5',
	teaser: 'teaser5',
	content: 'content5',
	language: 'de',
	CreatedBy: 'Seeding',
	ModifiedBy: 'Seeding'
}, {
	title: 'title6',
	teaser: 'teaser6',
	content: 'content6',
	language: 'de',
	CreatedBy: 'Seeding',
	ModifiedBy: 'Seeding'
}, {
	title: 'title7',
	teaser: 'teaser7',
	content: 'content7',
	language: 'fr',
	CreatedBy: 'Seeding',
	ModifiedBy: 'Seeding'
}, {
	title: 'title8',
	teaser: 'teaser8',
	content: 'content8',
	language: 'es',
	CreatedBy: 'Seeding',
	ModifiedBy: 'Seeding'
}];
var defaultTags = [{
	"name": "tag1",
	"color": "ffcc00"
}, {
	"name": "tag2",
	"color": "ff0000"
}, {
	"name": "tag3",
	"color": "ffff00"
}];
var defaultCategories = [{
	"name": "cat1",
	"color": "ffcc00"
}, {
	"name": "cat2",
	"color": "ff0000"
}, {
	"name": "cat3",
	"color": "ffff00"
}];
var defaultComments = [{
	"title": "CommentTitle",
	"content": "CommentContent"
}, {
	"title": "CommentTitle",
	"content": "CommentContent"
}, {
	"title": "CommentTitle",
	"content": "CommentContent"
}];
pages.forEach(function(obj) {
	Page.create(obj, function(id, page) {
		//console.log("id: ", id, " page:", page);
		//adding tags
		defaultTags.forEach(function(tagobj) {
			//console.warn("tagobj:", tagobj);
			var tag = page.tags.build(tagobj, function(buildid, buildtag) {
				//console.log("buildid: ", buildid, " buildtag:", buildtag);
			}).save();
			//console.log("Added tag: ", tag);
		});
		//adding cats
		defaultCategories.forEach(function(catobj) {
			var cat = page.categories.build(catobj, function(buildid, buildcat) {
				//console.log("buildid: ", buildid, " buildtag:", buildcat);
			}).save();
			//console.log("Added cat: ", cat);
		});
		//adding comments
		defaultComments.forEach(function(commentobj) {
			var comment = page.comments.build(commentobj, function(buildid, buildcomment) {
				//console.log("buildid: ", buildid, " buildtag:", buildcomment);
			}).save();
			//console.log("Added comment: ", comment);
		});
	});
});