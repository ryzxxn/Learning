const mysql = require('mysql');
module.exports function connectDB(connectionDetails) {
    const connection = mysql.createConnection(config.db);

    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database');
      });
}