const express = require('express');
const router = express.Router();
const Vaccination = require('../models/Vaccination');
const authenticate = require('../middleware/authenticate');

// Lấy thông tin tiêm phòng của người dùng hiện tại
router.get('/', authenticate, async (req, res) => {
  try {
    const vaccinationInfo = await Vaccination.findOne({ userId: req.user.userId });
    if (!vaccinationInfo) {
      // Nếu không có dữ liệu, trả về mặc định
      return res.json({ gender: 'Nam', status: 'Chưa tiêm' });
    }
    res.json(vaccinationInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật thông tin tiêm phòng
router.put('/', authenticate, async (req, res) => {
  try {
    const vaccinationInfo = await Vaccination.findOneAndUpdate(
      { userId: req.user.userId },
      { ...req.body, userId: req.user.userId },
      { new: true, upsert: true }
    );
    res.json(vaccinationInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;