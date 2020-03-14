const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  designation: {type: String}
});

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Employee', employeeSchema);
