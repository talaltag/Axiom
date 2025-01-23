
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
  entryFee: { type: String },
  category: { type: String },
  restrictions: { type: String },
  hasLimit: { type: String },
  limit: { type: String },
  description: { type: String },
  attributes: { type: String },
  totalPrizePool: { type: String },
  winnerCount: { type: Number },
  status: { type: String, default: 'Registration Open' },
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);
