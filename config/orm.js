const connection = require("./connection");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

let orm = {
  // Select all burgers from db
  selectAll: (callback) => {
    let queryString = `SELECT * FROM burgers`;
    connection.query(queryString, (err, results) => {
      if (err) {
        throw err;
      }
      callback(results);
    });
  },
  // Insert a burger into the db
  insertOne: (cols, vals, callback) => {
    let queryString = "INSERT INTO burgers";
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    connection.query(queryString, vals, (err, results) => {
      if (err) {
        throw err;
      }
      callback(results);
    });
  },
  // Update the burger's "devoured" status in db
  // updateOne: (eatStatus, id, callback) => {
  //   let queryString = "UPDATE burgers SET devoured = ? WHERE id = ?";
  //   connection.query(queryString, [eatStatus, id], (err, results) => {
  //     if (err) throw err;
  //     callback(results);
  //   });
  // },
};

// Export orm object for the model (burger.js)
module.exports = orm;
