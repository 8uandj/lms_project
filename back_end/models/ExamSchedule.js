const mongoose = require('mongoose');

const ExamScheduleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  semester: { type: String, required: true },
  exams: [{
    stt: Number,
    examCode: String,
    examName: String,
    date: String,
    timeSlot: String,
    method: String,
    room: String,
    examNumber: String,
  }],
});

module.exports = mongoose.model('ExamSchedule', ExamScheduleSchema);