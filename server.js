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
    db.todos.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

app.get("/find/:id", (req, res) => {
    db.todos.findOne(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    );
});

app.post("/submit", (req, res) => {
    db.todos.insert(req.body, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

app.post("/updateTask/:id", (req, res) => {
    db.todos.update(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        {
            $set: {
                task: req.body.updatedTask
            }
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    );
});

app.listen(PORT, () => {
    console.log("App running on port " + PORT);
});