const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const authenticate = require('../middleware/authenticate');

// Lấy hồ sơ cá nhân
router.get('/', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật hồ sơ cá nhân
router.put('/', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      req.body,
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;