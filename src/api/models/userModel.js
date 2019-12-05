const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Address = require('./addressModel');

let userSchema = new Schema({
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
        required: true,
        trim: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: Address,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        enum: ['STUDENT', 'SPEAKER', 'ADMIN'],
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);