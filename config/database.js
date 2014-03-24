module.exports = {
    development: {
        driver: 'sqlite3',
        database: 'db/website-dev.sqlite3'
    },
    test: {
        driver: 'sqlite3',
        database: 'db/website-test.sqlite3'
    },
    production: {
        driver: 'sqlite3',
        database: 'db/website.sqlite3'
    }
};