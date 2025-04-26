const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

// Đăng ký (tạo tài khoản sinh viên)
router.post('/register', async (req, res) => {
  const { userId, password, fullName, class: className, email } = req.body;

  try {
    let user = await User.findOne({ userId });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({
      userId,
      password: await bcrypt.hash(password, 10),
      fullName,
      class: className,
      email,
    });

    await user.save();

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm route GET /me để lấy thông tin người dùng hiện tại
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId }).select('-password'); // Không trả về mật khẩu
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;