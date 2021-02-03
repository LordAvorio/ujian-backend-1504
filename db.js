const mysql = require('mysql')

// INFO KONEKSI KE MYSQL
var dbConnectionInfo = {
    host: process.env.DB_HOST,
    port:  process.env.DB_PORT,
    user: process.env.DB_USER,
    password: "",
    connectionLimit: 5,
    database: "backend_2021"
}

var dbConnection = mysql.createPool(dbConnectionInfo);

dbConnection.getConnection(function (error, connection){
    // Untuk Error Koneksi Server
    if(error){
        return error;
    }
    console.log('Connected to MySQL Database')

    // Buat DB
    connection.on('error', function(err) {
        console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function(err) {
        console.error(new Date(), 'MySQL close', err);
    });
})

module.exports = dbConnection