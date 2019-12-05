const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Speaker = require('./speakerModel')

let lessonSchema = new Schema({
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
    },
    speaker: {
        type: Schema.Types.ObjectId,
        ref: Speaker,
        required: false
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);