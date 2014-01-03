console.log('Seeding users...');

var users = [{
    name: 'user',
    email: 'user@password.en',
    password: 'password',
    language: 'en',
    CreatedBy: 'Seeding',
    ModifiedBy: 'Seeding'
}, {
    name: 'user0',
    email: 'user@password.de',
    password: 'password',
    language: 'de',
    CreatedBy: 'Seeding',
    ModifiedBy: 'Seeding'
}, {
    name: 'user1',
    email: 'user@password.fr',
    password: 'password',
    language: 'fr',
    CreatedBy: 'Seeding',
    ModifiedBy: 'Seeding'
}, {
    name: 'user2',
    email: 'user@password.es',
    password: 'password',
    language: 'es',
    CreatedBy: 'Seeding',
    ModifiedBy: 'Seeding'

}];

users.forEach(function(obj) {
    User.create(obj, function(users) {
        console.log('Added: ', users);
    });  
});