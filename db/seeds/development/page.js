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

pages.forEach(function(obj) {
	Page.create(obj, function(pages) {
		console.log('Added: ', pages);
	});
});