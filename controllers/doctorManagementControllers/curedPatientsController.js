const CuredPatientsModel = require("../../models/doctorManagementModel/curedPatientsModel.js");

const addCuredPatient = async (req, res) => {
    try {
        const {
            patient_id,
            patient_name,
            doctor_id,
            doctor_name,
            first_appointment_date,
            cured_date,
            illness,
            cured
        } = req.body;

        const findCuredPatient = await CuredPatientsModel.find({
            $and: [
                { patient_id: patient_id },
                { doctor_id: doctor_id },
                { illness: illness },
                { first_appointment_date: first_appointment_date }
            ]
        })

        if (findCuredPatient.length > 0) {
            return res.status(409).json({ message: patient_name + " is already chanelling " + doctor_name + " for the " + illness});
        }

        const curedPatients = new CuredPatientsModel({
            patient_id,
            patient_name,
            doctor_id,
            doctor_name,
            first_appointment_date,
            cured_date,
            illness,
            cured
        });

        await curedPatients.save();
        res.status(201).json(curedPatients);
    } catch (error) {
        res.status(500).json(error);
    };
};

const getCuredPatients = async (req, res) => {

    try {
        const curedPatients = await CuredPatientsModel.find();
        res.status(200).json(curedPatients);
    } catch (error) {
        res.status(500).json(error);
    }
};


const getCuredPatientById = async (req, res) => {

    const curedPatientId = req.params.id;
    try {
        const curedData = await CuredPatientsModel.findById(curedPatientId);
        res.status(200).json(curedData);

        if (!curedData) {
            return res.status(404).json("No cured patient for the given id!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


const updateCuredPatient = async (req, res) => {

    const curedPatientId = req.params.id;
    try {

        const curedData = await CuredPatientsModel.findById(curedPatientId);

        if (!curedData) {
            return res.status(404).json("Not found such a cured patient to update");
        }

        const { cured_date, cured } = req.body;

        const CuredPatient = await CuredPatientsModel.findByIdAndUpdate(curedPatientId, { cured_date, cured });

        res.status(200).json(CuredPatient);

    } catch (error) {
        res.status(500).json(error.message);
    }

};

const deleteCuredPatient = async (req, res) => {

    const curedPatientId = req.params.id;

    try {
        const CuredPatient = await CuredPatientsModel.findById(curedPatientId);

        if (!CuredPatient) {
            return res.status(404).json("Not found such a cured patient to delete");
        }

        const delCuredPatient = await CuredPatientsModel.findByIdAndDelete(curedPatientId);
        res.status(200).json(delCuredPatient);

    } catch (error) {
        res.status(500).json(error.message);
    }
};


const getCuredPatientByDocId = async (req, res) => {

    const docId = req.params.id;
    try {
        const curedData = await CuredPatientsModel.find({doctor_id: docId});
        res.status(200).json(curedData);

        if (!curedData) {
            return res.status(404).json("No cured patient for the given doctor id!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    addCuredPatient,
    getCuredPatientById,
    getCuredPatients,
    deleteCuredPatient,
    updateCuredPatient,
    getCuredPatientByDocId
};
