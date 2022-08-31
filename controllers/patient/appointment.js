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
        AID:req.body.AID,
        doctorName:req.body.doctorName,
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

// exports.findbyid = (req, res) => {
//     const id = req.params.id;

//     appointment.findById({id}, (err, result) => {
//         console.log("ggdg")
//         if (err){
//             res.send(err)
//             console.log("d",err.message)
//         }
//             res.send(err)
//         res.send(result)
//         console.log("usdg")
//     })
// }

exports.findall = async (req, res) => {

    try {
        const students = await appointment.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json(error);
    }
};



exports.findbyid = async (req, res) => {

    const StudentId = req.params.id;
    try {
        const Student = await appointment.findById(StudentId);
        res.status(200).json(Student);

        if (!Student) {
            return res.status(404).json("No Student found for the given id!");
        }
    } catch (error) {
        res.status(400).json(error);
    }
};


exports.delete = (req, res) => {

    appointment.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err)
            res.send(err)

        res.send(result)
    })
}



exports.update= (req, res) => {

    let userId = req.params.id;
    const {  patientNIC, patientName, doctorID, date, time,status,AID, doctorName} = req.body;

    const updateappointment = {
        patientNIC,
        patientName,
        doctorID, 
        date, 
        time,
        status,
        AID,
        doctorName,
    }
    appointment.findByIdAndUpdate(userId, updateappointment).then(() => {
        res.status(200).send({ status: "successfully updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error with updating data" });
    })

}

