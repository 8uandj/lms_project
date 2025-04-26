const mongoose = require('mongoose');

const VaccinationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  gender: String,
  status: String, // Ví dụ: "Chưa tiêm", "Đã tiêm mũi 1", "Đã tiêm mũi 2"
});

module.exports = mongoose.model('Vaccination', VaccinationSchema);