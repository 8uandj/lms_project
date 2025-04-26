const express = require('express');
const router = express.Router();
const StudyResult = require('../models/StudyResult');
const authenticate = require('../middleware/authenticate');

// Lấy kết quả học tập
router.get('/', authenticate, async (req, res) => {
  try {
    const results = await StudyResult.find({ userId: req.user.userId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật kết quả học tập
router.post('/', authenticate, async (req, res) => {
  try {
    const result = new StudyResult({ userId: req.user.userId, ...req.body });
    await result.save(); // Đảm bảo dòng này được gọi
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

router.post('/', authenticate, async (req, res) => {
  try {
    console.log('Received data:', req.body); // Log dữ liệu nhận được
    const result = new StudyResult({ userId: req.user.userId, ...req.body });
    await result.save();
    console.log('Saved data:', result); // Log dữ liệu đã lưu
    res.json(result);
  } catch (err) {
    console.error('Error saving data:', err); // Log lỗi
    res.status(500).json({ message: err.message });
  }
});

// Xóa tất cả kết quả học tập của người dùng hiện tại
router.delete('/', authenticate, async (req, res) => {
  try {
    await StudyResult.deleteMany({ userId: req.user.userId });
    res.json({ message: 'All study results deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});