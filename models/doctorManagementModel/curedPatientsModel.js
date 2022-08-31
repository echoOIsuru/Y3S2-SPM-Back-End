const mongoose = require('mongoose');
const { Schema } = mongoose;

//cured patients database schema
const curedPatientsSchema = new Schema({
    patient_id: {
        type: String,
        required: true,
    },
    patient_name: {
        type: String,
        required: true,
    },
    doctor_id: {
        type: String,
        required: true,
    },
    doctor_name: {
        type: String,
        required: true,
    },
    first_appointment_date: {
        type: String,
        required: true,
    },
    cured_date: {
        type: String,
    },
    illness: {
        type: String,
        required: true,
    },
    cured: {
        type: String,
        required: true,
    },

});

curedPatientsSchema.index({ doctor_id: 1, patient_id: 1, first_appointment_date: 1, illness:1 }, { unique: true });

const CuredPatients = mongoose.model('cured_patients', curedPatientsSchema);
module.exports = CuredPatients;