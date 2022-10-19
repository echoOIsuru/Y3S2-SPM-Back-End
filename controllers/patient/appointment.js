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





exports.finddata = async (req, res) => {

    // const StudentId = req.params.id;
    try {
        const Student = await appointment.aggregate([
            { $count: "myCount" }
            ]) 
            console.log('Student');
        res.status(200).json(Student);

        if (!Student) {
            return res.status(404).json("No Student found for the given id!");
        }
    } catch (error) {
        res.status(400).json(error);
    }
};














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


//get all students by id
exports.getDoctorsAppointments = async (req, res) => {

    const DoctorId = req.params.id;
    try {
        const appointments = await appointment.find({doctorID: DoctorId});
        res.status(200).json(appointments);

        if (!appointments) {
            return res.status(404).json("No appointments found for the given doctor id!");
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

//get appointment by id
exports.getAppointmentById = async (req, res) => {

    const appointmentId = req.params.id;
    try {
        const Appointment = await appointment.findById(appointmentId);
        res.status(200).json(Appointment);

        if (!Appointment) {
            return res.status(404).json("No Appointment found for the given id!");
        }
    } catch (error) {
        res.status(400).json(error);
    }
};
