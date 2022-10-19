const mongoose = require('mongoose');

const schema = mongoose.Schema({
   doctor: {
        type: String,
        require: true
    },
    s: {
        type: String,
        require: true
    },
   
})

const CreatePatientModel = mongoose.model('p', schema);
module.exports = CreatePatientModel;