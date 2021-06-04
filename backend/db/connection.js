const pgp = require('pg-promise');
var connection = pgp(process.env.DATABASE_URL);
module.exports = connection;
