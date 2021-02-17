const mysql = require('mysql');

// membuat koneksi
const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dbrestapi'
});

// mengetes koneksi ke database
connection.connect((err)=>{
        if (err) throw err;
        console.log("Database tersambung!");
});

module.exports = connection;
