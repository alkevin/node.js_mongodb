const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_KEY = "WinterIsComingGOT2019";

var Schema = mongoose.Schema;

const Address = require('./addressModel');

let userSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
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
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Schema.Types,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

module.exports = mongoose.model('User', userSchema);