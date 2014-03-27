console.log('Seeding users...');

var users = [{
    name: 'Axel Schweiss',
    email: 'user@password.en',
    password: 'password',
    language: 'en',
    isAdmin: 'true',
    CreatedBy: 'Seeding',
    ModifiedBy: 'Seeding'
}, {
    name: 'Rainer Zufall',
    email: 'user@password.de',
    password: 'password',
    language: 'de',
    CreatedBy: 'Seeding',
    ModifiedBy: 'Seeding'
}, {
    name: 'Moni Tor',
    email: 'user@password.fr',
    password: 'password',
    language: 'fr',
    CreatedBy: 'Seeding',
    ModifiedBy: 'Seeding'
}, {
    name: 'SmushSomePush',
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