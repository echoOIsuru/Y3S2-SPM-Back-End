const TestModel = require("../../models/userManagement/testModel");


exports.test = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" })
        return;
    }

    const record = new TestModel({
        testfiled1: req.body.testfiled1,
        testfiled2: req.body.testfiled2,
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