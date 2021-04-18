const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;