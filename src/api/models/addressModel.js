const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let addressSchema = new Schema({
    numero: {
        type: Number,
        required: [true, "can't be blank"]
    },
    street: {
        type: String,
        required: [true, "can't be blank"]
    },
    city: {
        type: String,
        required: [true, "can't be blank"]
    },
    postalcode: {
        type: Number,
        maxlength: 5,
        required: [true, "can't be blank"]
    },
    country: {
        type: String,
        required: [true, "can't be blank"]
    }
});

module.exports = mongoose.model('Address', addressSchema);