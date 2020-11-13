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

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
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
  updateOne: (objColVals, condition, callback) => {
    let queryString = "UPDATE burgers";
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },
  // Delete a burger from the db
  deleteOne: (condition, callback) => {
    let queryString = "DELETE FROM burgers";
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },
};

// Export orm object for the model (burger.js)
module.exports = orm;
