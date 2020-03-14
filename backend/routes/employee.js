const express = require('express');

const EmployeeController = require('../controllers/employee');

const router = express.Router();

router.post('/signup', EmployeeController.createUser);

router.post('/login', EmployeeController.employeeLogin);

module.exports = router;
