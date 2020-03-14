const express = require('express');

const PatientController = require('../controllers/patient');

const router = express.Router();

router.post('/signup', PatientController.createUser);

router.post('/login', PatientController.patientLogin);

router.get('/patient_list', PatientController.getPatientList);

// Get a Patient
router.get('/:id', PatientController.getPatient);
// Update a Patient
router.put('/:id', PatientController.updatePatient);

module.exports = router;
