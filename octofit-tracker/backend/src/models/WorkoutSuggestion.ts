import mongoose from 'mongoose';

const workoutSuggestionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  duration: Number, // in minutes
  intensity: { type: String, enum: ['low', 'medium', 'high'] },
  type: String, // e.g., running, cycling, strength training
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('WorkoutSuggestion', workoutSuggestionSchema);
