const express = require('express');
var router = express.Router();
const { addCuredPatient,
    getCuredPatients,
    getCuredPatientById,
    updateCuredPatient,
    deleteCuredPatient,
    getCuredPatientByDocId
} = require('../controllers/doctorManagementControllers/curedPatientsController.js');

const { addPatientMedication,
    getPatientMedications,
    getPatientMedicationById,
    updatePatientMedication,
    deletePatientMedication,
    getMedicationByPatient
} = require('../controllers/doctorManagementControllers/patientMedicationsController.js')

//cured patients routes

router.post("/curedPatient", addCuredPatient);

router.get("/curedPatients", getCuredPatients);

router.get("/curedPatient/:id", getCuredPatientById);

router.get("/curedPatientsByID/:id", getCuredPatientByDocId);

router.put("/curedPatient/:id", updateCuredPatient);

router.delete("/curedPatient/:id", deleteCuredPatient);


// patient medications routes

router.post("/patientMedication", addPatientMedication);

router.get("/patientMedications", getPatientMedications);

router.get("/patientMedication/:id", getPatientMedicationById);

router.get("/medicationByPatientID/:id", getMedicationByPatient);

router.put("/patientMedication/:id", updatePatientMedication);

router.delete("/patientMedication/:id", deletePatientMedication);

module.exports = router;