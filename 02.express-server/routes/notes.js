const router = require("express").Router();
const fs = require("fs");
const path = require('path')

router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/add.html'));
});

router.post("/add", (req, res) => {
  fs.writeFileSync("note.txt", req.body.note);
  res.redirect("/");
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});

module.exports = router;
