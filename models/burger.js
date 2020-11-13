const orm = require("../config/orm");

const burger = {
  selectAll: (callback) => {
    orm.selectAll((res) => {
      callback(res);
    });
  },
  insertOne: (cols, vals, callback) => {
    orm.insertOne(cols, vals, (res) => {
      callback(res);
    });
  },
  updateOne: (objColVals, condition, callback) => {
    orm.updateOne(objColVals, condition, (res) => {
      callback(res);
    });
  },
};

// Export model for controller to use
module.exports = burger;
