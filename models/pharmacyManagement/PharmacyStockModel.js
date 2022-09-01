const mongoose = require('mongoose');
const {Schema} = mongoose;

const PharmacyStockSchema = new Schema({
    medicine: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    quantity: {
        type: String,
        required: true
    },
    price_per_one: {
        type: String,
        required: true
    },
    expire_date: {
        type: String,
        required: true
    },
    added_date: {
        type: String,
        required: true
    },
    total_cost: {
        type: String,
        required: true
    }
});

const PharmacyStockModel = mongoose.model('Pharmacy_StockModel', PharmacyStockSchema);
module.exports = PharmacyStockModel;