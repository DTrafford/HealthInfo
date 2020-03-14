const mongoose = require('mongoose');

const conditionSchema = mongoose.Schema({
    name: { type: String },
    symptoms : {type: Array },
    description: { type: String },
    treatment: { type: String }
});

module.exports = mongoose.model('Conditions', conditionSchema);
