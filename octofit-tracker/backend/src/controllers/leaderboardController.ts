import { Request, Response } from 'express';
import LeaderboardEntry from '../models/Leaderboard';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .sort({ score: -1 })
      .populate('user team');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

export const getTeamLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find({ team: req.params.teamId })
      .sort({ score: -1 })
      .populate('user');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
};

export const getUserLeaderboardPosition = async (req: Request, res: Response) => {
  try {
    const entry = await LeaderboardEntry.findOne({ user: req.params.userId })
      .populate('user team');
    if (!entry) {
      res.status(404).json({ error: 'User not found on leaderboard' });
      return;
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard position' });
  }
};

export const createLeaderboardEntry = async (req: Request, res: Response) => {
  try {
    const { user, team, score } = req.body;
    const entry = new LeaderboardEntry({ user, team, score });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
};

export const updateLeaderboardEntry = async (req: Request, res: Response) => {
  try {
    const entry = await LeaderboardEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
};
