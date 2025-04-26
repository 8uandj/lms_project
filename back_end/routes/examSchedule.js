const express = require('express');
const router = express.Router();
const ExamSchedule = require('../models/ExamSchedule');
const authenticate = require('../middleware/authenticate');

// Lấy lịch thi
router.get('/', authenticate, async (req, res) => {
  try {
    const schedules = await ExamSchedule.find({ userId: req.user.userId });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật lịch thi
router.post('/', authenticate, async (req, res) => {
  try {
    const schedule = new ExamSchedule({ userId: req.user.userId, ...req.body });
    await schedule.save();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;