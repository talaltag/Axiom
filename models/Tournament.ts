
import mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  game: { type: String, required: true },
  platform: { type: String, required: true },
  gameMode: { type: String, required: true },
  teamSize: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  entryFee: { type: String, required: true },
  category: { type: String, required: true },
  restrictions: { type: String },
  hasLimit: { type: String },
  limit: { type: String },
  description: { type: String },
  attributes: { type: String },
  totalPrizePool: { type: String },
  winnerCount: { type: Number },
  prizeSplit: [Number],
  paymentMethod: { type: String },
  images: [String],
  status: { type: String, default: 'Registration Open' }
}, {
  timestamps: true
});

export default mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);
