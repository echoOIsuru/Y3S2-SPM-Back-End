var PharmacyStockModel = require('../../models/pharmacyManagement/PharmacyStockModel');
var PharmacyPrescriptionModel = require('../../models/pharmacyManagement/PharmacyPrescriptionModel');

/**
 * Add new medicine stock
 */
exports.addStock = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content Cannot Be Empty"
        });
        return;
    }

    const record = new PharmacyStockModel({
        medicine: req.body.medicine,
        quantity: req.body.quantity,
        price_per_one: req.body.price_per_one,
        expire_date: req.body.expire_date,
        added_date: req.body.added_date,
        total_cost: req.body.total_cost
    })

    record.save(record)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occurred While Inserting"
            })
        })
}

/**
 * Retrieve Medicine Stocks Details
 */
exports.retrieveStocks = async (req, res) => {
    PharmacyStockModel.find()
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found Data"
                })
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occured While Retrieving"
            })
        })
}

/**
 * Retrieve Medicine Stock Data
 */
 exports.retrieveStock = async (req, res) => {
    const id = req.params.id;

    PharmacyStockModel.find({"_id":id})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found Data With ID : " + id
                });
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occured While Retrieving"
            })
        })
}

/**
 * Update Medicine Stock
 */
exports.updateStock = async (req, res) => {

    try{
        PharmacyStockModel.findByIdAndUpdate(req.params.id, req.body, async(err, result) => {
            if (err) {
                res.send(err);
            }else{
                await res.send(result);
            }
        })
    }catch(err){
        console.log(err);
    }
}

/**
 * Delete Medicine Stock
 */
exports.deleteStock = async (req, res) => {
    const id = req.params.id;

    PharmacyStockModel.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Delete with id : ${id}`
                });
            }else{
                res.send({
                    message: "Record deleted successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occured While Deleting"
            })
        })
}

/**
 * Check medicine stock
 */
exports.checkMedicine = async (req, res) => {
    const medicine = req.body.medicine;
    // const quantity = req.body.quantity;

    PharmacyStockModel.find({"medicine":medicine})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found Data With medicine called : " + medicine
                });
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occured While Retrieving"
            })
        })
}

/**
 * Add prescription
 */
exports.addPrescription = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content Cannot Be Empty"
        });
        return;
    }

    const record = new PharmacyPrescriptionModel({
        user_id: req.body.id,
        total_bill: req.body.total_bill,
        added_date: req.body.added_date,
        medicines: req.body.data
    })

    record.save(record)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occurred While Inserting"
            })
        })
}