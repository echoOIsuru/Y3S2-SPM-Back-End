const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientMedicationSchema = new Schema({
    appointment_id: {
        type: String,
        required: true,
        unique: true
    },
    patient_id: {
        type: String,
        required: true
    },
    doctor_id: {
        type: String,
        required: true
    },
    patient_name: {
        type: String,
        required: true,
    },
    doctor_name: {
        type: String,
        required: true,
    },
    appointment_date: {
        type: String,
        required: true,
    },
    appointment_time: {
        type: String,
        required: true,
    },
    illness: {
        type: String,
        required: true,
    },
    medications: {
        type: String,
        required: true,
    },

});

const CuredPatients = mongoose.model('patient_medications', patientMedicationSchema);
module.exports = CuredPatients;