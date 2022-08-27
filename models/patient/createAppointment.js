const mongoose = require('mongoose');

const schema = mongoose.Schema({
   patientNIC: {
        type: String,
        require: true
    },
    patientName: {
        type: String,
        require: true
    },
    doctorID: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },

    time: {
        type: String,
        require: true
    }

})

const CreatePatientModel = mongoose.model('patient', schema);
module.exports = CreatePatientModel;