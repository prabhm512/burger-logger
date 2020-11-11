const connection = require("./connection");

let orm = {
  // Select all burgers from db
  selectAll: (callback) => {
    let queryString = "SELECT * FROM burgers";
    connection.query(queryString, (err, results) => {
      if (err) {
        throw err;
      }
      callback(results);
    });
  },
  // Insert a burger into the db
  insertOne: (name, eatStatus, callback) => {
    let queryString =
      "INSERT INTO burgers (burger_name, devoured) VALUES (?, ?)";
    connection.query(queryString, [name, eatStatus], (err, results) => {
      if (err) {
        throw err;
      }
      callback(results);
    });
  },
  // Update the burger's "devoured" status in db
  updateOne: (eatStatus, id, callback) => {
    let queryString = "UPDATE burgers SET devoured = ? WHERE id = ?";
    connection.query(queryString, [eatStatus, id], (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },
};

// Export orm object for the model (burger.js)
module.exports = orm;
