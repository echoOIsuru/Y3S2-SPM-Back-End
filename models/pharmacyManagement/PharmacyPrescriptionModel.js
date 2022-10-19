const mongoose = require('mongoose');
const {Schema} = mongoose;

const PharmacyPrescriptionSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    total_bill: {
        type: String,
        required: true
    },
    added_date: {
        type: String,
        required: true
    },
    medicines: {
        type: Array,
        required: true
    }
});

const PharmacyPrescriptionModel = mongoose.model('Pharmacy_PrescriptionModel', PharmacyPrescriptionSchema);
module.exports = PharmacyPrescriptionModel;