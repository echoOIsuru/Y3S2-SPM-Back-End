var PharmacyStockModel = require('../../models/pharmacyManagement/PharmacyStockModel');
var PharmacyPrescriptionModel = require('../../models/pharmacyManagement/PharmacyPrescriptionModel');
const PatientMedicationsModel = require("../../models/doctorManagementModel/patientMedicationsModel.js");

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
            } else {
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

    PharmacyStockModel.find({ "_id": id })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found Data With ID : " + id
                });
            } else {
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

    try {
        PharmacyStockModel.findByIdAndUpdate(req.params.id, req.body, async (err, result) => {
            if (err) {
                res.send(err);
            } else {
                await res.send(result);
            }
        })
    } catch (err) {
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
            } else {
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
    const quantity = parseInt(req.body.quantity);

    PharmacyStockModel.find( {$and: [{ "medicine": medicine }, {$expr: {$gte: [{ $toInt: "$quantity" }, quantity]}} ]} )
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found Data With medicine called : " + medicine
                });
            } else {
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

    PatientMedicationsModel.find({ "appointment_id": req.body.id })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found Data With ID"
                });
            } else {

                const record = new PharmacyPrescriptionModel({
                    id: req.body.id,
                    name: data[0].patient_name,
                    total_bill: req.body.total_bill,
                    added_date: req.body.added_date,
                    medicines: req.body.data
                })

                record.save(record)
                    .then(data => {

                        // console.log(data.medicines);

                        // data.medicines.forEach((i) => {
                        //     PharmacyStockModel.updateOne({ medicine: i.medicine },{ $inc: { quantity: -i.quantity }})
                        // })

                        res.send(data)
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Error Occurred While Inserting"
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occured While Retrieving"
            })
        })

}

/**
 * Get prescriptions
 */
exports.getPrescriptions = async (req, res) => {
    PharmacyPrescriptionModel.find()
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found Data"
                })
            } else {
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
 * Get prescription's more details
 */
exports.getMoreDetails = async (req, res) => {
    const id = req.params.id;

    PharmacyPrescriptionModel.find({ "_id": id })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found Data With ID : " + id
                });
            } else {
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
 * Get total no of prescriptions
 */
exports.getTotalPrescriptions = async (req, res) => {
    const agg = [
        {
            $group: {
                _id: null,
                count: { $count: {} }
            }
        }
    ]
    try {
        PharmacyPrescriptionModel.aggregate(agg).exec((error, result) => {
            if (error)
                return response.send(error);
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }

}

/**
 * Get total income
 */
exports.getTotalIncome = async (req, res) => {
    const agg = [
        {
            $group: {
                _id: null,
                income: { $sum: { "$toDouble": "$total_bill" } }
            }
        }
    ]
    try {
        PharmacyPrescriptionModel.aggregate(agg).exec((error, result) => {
            if (error)
                return response.send(error);
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get total pharmacy users
 */
exports.getTotalUsers = async (req, res) => {
    const agg = [
        {
            $group: {
                _id: "$name",
                count: { $count: {} }
            }
        }
    ]
    try {
        PharmacyPrescriptionModel.aggregate(agg).exec((error, result) => {
            if (error)
                return response.send(error);
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get total income
 */
exports.getMonthlyIncome = async (req, res) => {

    const agg = [
        {
            $group: {
                _id: {
                    year: { $year: ({ $toDate: "$added_date" }) },
                    month: { $month: ({ $toDate: "$added_date" }) }
                },
                income: { $sum: { "$toDouble": "$total_bill" } }
            }
        }
    ]
    try {
        PharmacyPrescriptionModel.aggregate(agg).exec((error, result) => {
            if (error)
                return response.send(error);
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get medicine stocks(out of stock soon)
 */
exports.getMedicines = async (req, res) => {

    PharmacyStockModel.find({$expr: {$lte: [{ $toLong: "$quantity" }, 100]}})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: "Not Found Data"
            });
        } else {
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error Occured While Retrieving"
        })
    })

    // const agg = [
    //     {
    //         // $match: {$gt: [
    //         //     {$convert:{ input: "$quantity", to: "int" }}, 100]}
    //         $match: { "quantity": { $gt: [{ $toLong: "$quantity" }, 300] } }
    //     },
    //     {
    //         $group: {
    //             _id: "$medicine"
    //         },
    //         // qty: "$quantity"
    //     }
    // ]
    // try {
    //     PharmacyStockModel.aggregate(agg).exec((error, result) => {
    //         if (error)
    //             return response.send(error);
    //         res.send(result)
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
}
