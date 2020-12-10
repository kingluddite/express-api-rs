const path = require("path");
const router = require("express").Router();

router.get("/find", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/find.html"));
});
router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/add.html"));
});
// "/notes" responds with the notes.html file
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
