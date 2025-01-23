
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cName: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Basic'], default: 'Basic' },
  profileImage: { type: String },
  password: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
