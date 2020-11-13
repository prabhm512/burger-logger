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

// UPDATE a specific record
router.put("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  burger.updateOne({ devoured: req.body.devoured }, condition, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export router for server to use
module.exports = router;
