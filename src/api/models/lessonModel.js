const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// const Speaker = require('./speakerModel');

let lessonSchema = new Schema({
    id: {
        type: Number,
        required: [true, "cen't be blank"]
    },
    name: {
        type: String,
        required: [true, "can't be blank"]
    },
    description: {
        type: String,
        required: false
    },
    startdate: {
        type: Date,
        required: [true, "can't be blank"]
    },
    enddate: {
        type: Date,
        required: [true, "can't be blank"]
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);