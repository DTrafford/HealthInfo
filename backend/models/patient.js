const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const patientSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  doctorName: {type: String},
  healthData: [
    {
      label: { type: String },
      value: {type: String }
    }
  ]
});

patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Patient', patientSchema);
