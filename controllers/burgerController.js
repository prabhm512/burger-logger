const express = require("express");
const burger = require("../models/burger");

const router = express.Router();

// CRUD actions

// READ all database records
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const hbsObject = {
      burgers: data,
    };
    res.render("index", hbsObject);
  });
});

// CREATE a new record
router.post("/api/burgers", (req, res) => {
  burger.insertOne(
    ["burger_name, devoured"],
    [req.body.name, req.body.devoured],
    (result) => {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    }
  );
});

// Export router for server to use
module.exports = router;
