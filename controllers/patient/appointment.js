const appointment = require("../../models/patient/createAppointment");


exports.appointment = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" })
        return;
    }

    const record = new appointment({
        patientNIC: req.body. patientNIC,
        patientName: req.body.patientName,
        doctorID: req.body.doctorID, 
        date: req.body.date, 
        time: req.body.time,
        status: req.body.status,
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


exports.find = (req, res) => {
    const id = req.params.id;

    appointment.find({"patientNIC":id}, (err, result) => {
        if (err)
            res.send(err)
        res.send(result)
    })
}

exports.delete = (req, res) => {

    appointment.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err)
            res.send(err)

        res.send(result)
    })
}



exports.update= (req, res) => {

    let userId = req.params.id;
    const {  patientNIC, patientName, doctorID, date, time,status} = req.body;

    const updateappointment = {
        patientNIC,
        patientName,
        doctorID, 
        date, 
        time,
        status

    }
    appointment.findByIdAndUpdate(userId, updateappointment).then(() => {
        res.status(200).send({ status: "successfully updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error with updating data" });
    })

}

