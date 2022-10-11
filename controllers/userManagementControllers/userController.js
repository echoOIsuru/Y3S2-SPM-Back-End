const userModel = require("../../models/userManagement/UserModel_UM");


exports.addUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" })
        return;
    }

    const record = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        password: req.body.password,
        userType: req.body.userType,
        specialization: req.body.specialization,
        date: new Date()
    })

    record
        .save(record)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some erro occurred while creating"
            })
        })

}

exports.getAllUsers = (req, res) => {
    try {
        userModel.find({}, (err, result) => {
            if (err)
                console.log(err);

            res.send(result)
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateUser = (req, res) => {
    try {
        userModel.findByIdAndUpdate(req.params.id, req.body, async (err, result) => {
            if (err)
                console.log(err)
            await res.send(result)
        })

    } catch (error) {
        console.log(error);
    }
}

exports.deleteUser = (req, res) => {
    try {
        userModel.findByIdAndDelete(req.params.id, (err, result) => {
            if (err)
                console.log(err)
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }
}

exports.login = (req, res) => {
    try {
        userModel.findOne(req.body, (err, result) => {
            if (err)
                console.log(err);
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getUserByCount = (req, res) => {
    const aggregatorOpts = [
        {
            $group: {
                _id: "$userType",
                value: { $sum: 1 },
            }
        }
    ]
    try {
        userModel.aggregate(aggregatorOpts).exec((error, result) => {
            if (error)
                return response.send(error);
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getDoctorsBySpecial = (req, res) => {
    const aggregatorOpts = [
        {
            $match: { "date": { $gte: new Date("2022-01-01"), $lt: new Date("2023-01-01") } }
        },
        {
            $group: {
                _id: {
                    specialization: "$specialization",
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    value: { $sum: 1 },
                }
                // specialization: { $dateToString: { format: "%Y-%m-%d", date: "$date" }, }
            }
        }
    ]
    try {
        userModel.aggregate(aggregatorOpts).exec((error, result) => {
            if (error)
                return response.send(error);
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }
}