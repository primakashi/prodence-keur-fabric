'user strict';

const mysql = require('mysql');
const dotenv = require('dotenv');

// set environment
dotenv.config();

// local mysql db connection
const configuration = {
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_TABLE,
    multipleStatements: true,
    timezone: 'UTC',
};

const connection = mysql.createConnection(configuration);

// connection.connect((err) => {
// 	console.log(err);
    // if (err) throw err;
// });

module.exports = connection;
