const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'oneclick_db',
    user: 'oneclick_admin',
    password: 'oneclick123'
})

module.exports = pool