const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mszPrabh09!",
  database: "burgers_db",
});

// Make connection
connection.connect((err) => {
  if (err) {
    console.error(`Error connecting ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

// Export connection for ORM to use.
module.exports = connection;
