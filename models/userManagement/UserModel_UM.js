const mongoose = require('mongoose')

const schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }

})

const userModel = mongoose.model('UserModel_UM', schema);
module.exports = userModel;