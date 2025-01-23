
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
  restrictions: { type: String, default: 'None' },
  hasLimit: { type: String, default: 'no' },
  limit: { type: String },
  description: { type: String, default: '' },
  attributes: { type: String, default: 'Regular' },
  totalPrizePool: { type: String, required: true },
  winnerCount: { type: Number, required: true },
  prizeSplit: { type: [Number], default: [] },
  paymentMethod: { type: String, required: true },
  images: { type: [String], default: [], required: false },
  status: { type: String, default: 'Registration Open' }
}, {
  timestamps: true
});

export default mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);
