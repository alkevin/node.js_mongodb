const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema({
    id: {
        type: Number
    },
    nom: {
        type: String,
        required: [true, "can't be blank"]
    },
    prenom: {
        type: String,
        required: [true, "can't be blank"]
    }
});

module.exports = mongoose.model('Users', userSchema);