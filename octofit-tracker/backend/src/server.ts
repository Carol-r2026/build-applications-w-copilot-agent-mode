import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import activityRoutes from './routes/activityRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import workoutRoutes from './routes/workoutRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('✅ Connected to octofit_db');
  })
  .catch((error) => {
    console.error('❌ Error connecting to octofit_db:', error);
    process.exit(1);
  });

// Codespaces-aware API URL support
const getApiUrl = () => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`;
  }
  return `http://localhost:${port}`;
};

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    apiUrl: getApiUrl(),
    codespace: process.env.CODESPACE_NAME || 'local'
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

app.listen(port, () => {
  console.log(`🚀 OctoFit Tracker API listening on port ${port}`);
  console.log(`🌐 API URL: ${getApiUrl()}`);
  console.log(`🎯 Codespace: ${process.env.CODESPACE_NAME || 'local'}`);
});

export default app;
