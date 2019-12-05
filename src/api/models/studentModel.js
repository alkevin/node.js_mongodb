const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Lesson = requite('./lessonModel');

let studentSchema = new Schema({
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
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: Lesson,
        required: false
    }]
});

module.exports = mongoose.model('Student', studentSchema);