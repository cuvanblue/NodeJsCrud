// get the client
const mysql = require('mysql2/promise');

// create the connection to database
const connection2 = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'bumbumtest',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});
// simple query


// with placeholder
module.exports = connection2;