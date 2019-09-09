const mysql=require('mysql2');

const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'a76oM0ZgV1',
    database: 'a76oM0ZgV1',
    password: '2J5sBbaMC0',
    port:'3306'
});

module.exports = pool.promise();
