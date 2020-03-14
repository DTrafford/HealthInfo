const mongoose = require('mongoose');

const tipSchema = mongoose.Schema({
    title: { type: String, required: true },
    url : {type: String, required: true },
    content: { type: String, required: true },
    // creatorName: { type: String },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    imagePath: { type: String }
});

module.exports = mongoose.model('Tips', tipSchema);
