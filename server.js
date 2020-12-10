const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const fs = require("fs");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use("/api", apiRoutes);

app.get("/api/characters", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    res.json(JSON.parse(data));
  });
});

app.get("/api/characters/find/:routename", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) throw err;

    const allCharacters = JSON.parse(data);
    const search = req.params.routename;
    for (let i = 0; i < allCharacters.length; i++) {
      if (allCharacters[i].routeName === search) {
        return res.json(allCharacters[i]);
      }
    }
    return res.json({
      msg: "the character you are searching for does not exist yo!",
    });
  });
});

app.post("/api/characters/new", (req, res) => {
  // console.log(req.body);
  // res.send("Yips");
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) throw err;
    const allCharacters = JSON.parse(data);
    allCharacters.push({
      routeName: req.body.routeName,
      name: req.body.name,
      role: req.body.role,
      age: parseInt(req.body.age),
      forcePoints: parseInt(req.body.forcePoints),
    });
    console.log(allCharacters);
    fs.writeFile("./data.json", JSON.stringify(allCharacters), (err) => {
      if (err) return res.JSON({ err: "problem adding" });
      return res.json({ msg: "successfully added" });
    });
  });
});

app.use("/", htmlRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
