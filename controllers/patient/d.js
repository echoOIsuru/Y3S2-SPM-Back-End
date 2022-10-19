const d = require("../../models/patient/d");


exports.d = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" })
        return;
    }

    const record = new d({
       doctor: req.body. doctor,
       s: req.body.s,
       
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
        const students = await d.find();
        res.status(200).json(students);
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
    const { doctor,s, } = req.body;

    const updateappointment = {
        doctor,
         s,
      
    }
   d.findByIdAndUpdate(userId, updateappointment).then(() => {
        res.status(200).send({ status: "successfully updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error with updating data" });
    })

}

