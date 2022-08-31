const express = require('express');
var router = express.Router();

//All controllers related to cured patients functionality

const { addCuredPatient,
    getCuredPatients,
    getCuredPatientById,
    updateCuredPatient,
    deleteCuredPatient,
    getCuredPatientByDocId
} = require('../controllers/doctorManagementControllers/curedPatientsController.js');

//All controllers related to medication history functionality

const { addPatientMedication,
    getPatientMedications,
    getPatientMedicationById,
    updatePatientMedication,
    deletePatientMedication,
    getMedicationByPatient
} = require('../controllers/doctorManagementControllers/patientMedicationsController.js')


//cured patients routes

//post request
router.post("/curedPatient", addCuredPatient);

//get request
router.get("/curedPatients", getCuredPatients);

//get request by id
router.get("/curedPatient/:id", getCuredPatientById);

//get request by id
router.get("/curedPatientsByID/:id", getCuredPatientByDocId);

//put request
router.put("/curedPatient/:id", updateCuredPatient);

//delete request
router.delete("/curedPatient/:id", deleteCuredPatient);


// patient medications routes

//post request
router.post("/patientMedication", addPatientMedication);

//get request
router.get("/patientMedications", getPatientMedications);

//get request by id
router.get("/patientMedication/:id", getPatientMedicationById);

//get request by id
router.get("/medicationByPatientID/:id", getMedicationByPatient);

//put request
router.put("/patientMedication/:id", updatePatientMedication);

//delete request
router.delete("/patientMedication/:id", deletePatientMedication);

module.exports = router;