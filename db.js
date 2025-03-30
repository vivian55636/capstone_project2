const { Pool } = require('pg');
require('dotenv').config();

const { DATABASE_URL='postgresql://SwiftCart_owner:npg_UmBVtEb3aik1@ep-autumn-wind-a5zplux3-pooler.us-east-2.aws.neon.tech/SwiftCart?sslmode=require' } = process.env;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
    ssl: process.env.DATABASE_USE_SSL === 'true',
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    connect: () => pool.connect (),
    end: () => pool.end (),
};