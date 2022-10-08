const PatientMedicationsModel = require("../../models/doctorManagementModel/patientMedicationsModel.js");

//add a medical record to a particular patient
const addPatientMedication = async (req, res) => {

    try {
        const {
            patient_id,
            doctor_id,
            patient_name,
            doctor_name,
            appointment_id,
            appointment_date,
            appointment_time,
            illness,
            medications
        } = req.body;

        const findPatientMedication = await PatientMedicationsModel.find({
            $or: [
                { appointment_id: appointment_id }
            ]
        })

        if (findPatientMedication.length > 0) {
            return res.status(409).json({ message: "Record from Appointment ID " + appointment_id + " already exists in the system! " });
        }

        const patientMedications = new PatientMedicationsModel({
            patient_id,
            doctor_id,
            patient_name,
            doctor_name,
            appointment_id,
            appointment_date,
            appointment_time,
            illness,
            medications
        });

        await patientMedications.save();
        res.status(201).json(patientMedications);
    } catch (error) {
        res.status(500).json(error);
    };
};

//get all medication history
const getPatientMedications = async (req, res) => {

    try {
        const patientMedications = await PatientMedicationsModel.find();
        res.status(200).json(patientMedications);
    } catch (error) {
        res.status(500).json(error);
    }
};

//get specific medical record by id
const getPatientMedicationById = async (req, res) => {
    const patientMedicationId = req.params.id;
    try {
        const medications = await PatientMedicationsModel.findById(patientMedicationId);
        res.status(200).json(medications);

        if (!medications) {
            return res.status(404).json("No medication details available for the given id!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//update a newly inserted medication record of a patient
const updatePatientMedication = async (req, res) => {

    const patientMedicationId = req.params.id;
    try {

        const medicationData = await PatientMedicationsModel.findById(patientMedicationId);

        if (!medicationData) {
            return res.status(404).json("Not found such medication details to update");
        }

        const { medications } = req.body;

        const PatientMedication = await PatientMedicationsModel.findByIdAndUpdate(patientMedicationId, { medications });

        res.status(200).json(PatientMedication);

    } catch (error) {
        res.status(500).json(error.message);
    }

};

//delete a newly inserted medication record
const deletePatientMedication = async (req, res) => {

    const patientMedicationId = req.params.id;

    try {
        const PatientMedication = await PatientMedicationsModel.findById(patientMedicationId);

        if (!PatientMedication) {
            return res.status(404).json("Not found such medication details to delete");
        }

        const delPatientMedication = await PatientMedicationsModel.findByIdAndDelete(patientMedicationId);
        res.status(200).json(delPatientMedication);

    } catch (error) {
        res.status(500).json(error.message);
    }
};

//get all medication history by patient ID
const getMedicationByPatient = async (req, res) => {

    const patientId = req.params.id;
    try {
        const medications = await PatientMedicationsModel.find({ patient_id: patientId });
        res.status(200).json(medications);

        if (!medications) {
            return res.status(404).json("No medication details available for the given patient Id!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    addPatientMedication,
    getPatientMedicationById,
    getPatientMedications,
    deletePatientMedication,
    updatePatientMedication,
    getMedicationByPatient
};