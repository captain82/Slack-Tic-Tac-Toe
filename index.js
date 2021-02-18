const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const importData = require("./data.json")

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/players", (req, res) => {
    res.send(importData);
});

app.post("/submit/:ca", (req, res) => {
    res.send(`The id is ${req.body.ca}`);
});

app.listen(port, () => {
    console.log("Express server listening on port");
});