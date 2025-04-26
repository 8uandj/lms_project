const mongoose = require('mongoose');

const StudyResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  semester: { type: String, required: true },
  results: [{
    stt: Number,
    courseCode: String,
    courseName: String,
    credits: Number,
    score10: String,
    letterGrade: String,
    score4: Number,
  }],
});

module.exports = mongoose.model('StudyResult', StudyResultSchema);