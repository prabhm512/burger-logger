const orm = require("../config/orm");

const burger = {
  selectAll: (callback) => {
    orm.selectAll((res) => {
      callback(res);
    });
  },
  insertOne: (name, eatStatus, callback) => {
    orm.insertOne(name, eatStatus, (res) => {
      callback(res);
    });
  },
  updateOne: (eatStatus, id, callback) => {
    orm.updateOne(eatStatus, id, (res) => {
      callback(res);
    });
  },
};

module.exports = burger;
