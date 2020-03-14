const express = require('express');
const ConditionController = require('../controllers/condition');

const router = express.Router();

// Get array of conditions
router.post('', ConditionController.getConditions);

module.exports = router;
