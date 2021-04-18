const express = require("express");
const mongojs = require("mongojs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "todolist";
const collections = ["todos"];

const db = mongojs(databaseUrl, collections);

// HTML Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../public/index.html"));
});

// API Routes
app.get("/all", (req, res) => {
    db.notes.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

app.listen(PORT, () => {
    console.log("App running on port " + PORT);
});