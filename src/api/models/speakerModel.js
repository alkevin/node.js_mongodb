const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Lesson = require('./lessonModel');

let speakerSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "can't be blank"]
    },
    lastname: {
        type: String,
        required: [true, "can't be blank"]
    },
    mail: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
        unique: true
    },
    age: {
        type: Number,
        required: false
    },
});

module.exports = mongoose.model('Speaker', speakerSchema);