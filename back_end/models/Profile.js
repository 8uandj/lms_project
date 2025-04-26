const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  address: {
    country: String,
    city: String,
    district: String,
    ward: String,
    street: String,
    houseNumber: String,
  },
  height: Number,
  weight: Number,
  phone: String,
  policyObject: String,
  studentNumber: String,
  trainingProgram: String,
  major: String,
  contactAddress: String,
  unionMember: {
    isMember: Boolean,
    joinDate: String,
    joinPlace: String,
    highestPosition: String,
  },
  partyMember: {
    isMember: Boolean,
    joinDate: String,
    joinPlace: String,
    highestPosition: String,
  },
  avatar: String, // Thêm trường avatar để lưu URL ảnh cá nhân
});

module.exports = mongoose.model('Profile', ProfileSchema);