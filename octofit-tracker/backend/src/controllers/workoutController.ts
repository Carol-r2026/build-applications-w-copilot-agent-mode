import { Request, Response } from 'express';
import WorkoutSuggestion from '../models/WorkoutSuggestion';

export const getWorkoutSuggestions = async (req: Request, res: Response) => {
  try {
    const suggestions = await WorkoutSuggestion.find().populate('user');
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout suggestions' });
  }
};

export const getUserWorkoutSuggestions = async (req: Request, res: Response) => {
  try {
    const suggestions = await WorkoutSuggestion.find({ user: req.params.userId });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user workout suggestions' });
  }
};

export const getWorkoutSuggestionById = async (req: Request, res: Response) => {
  try {
    const suggestion = await WorkoutSuggestion.findById(req.params.id).populate('user');
    if (!suggestion) {
      res.status(404).json({ error: 'Workout suggestion not found' });
      return;
    }
    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout suggestion' });
  }
};

export const createWorkoutSuggestion = async (req: Request, res: Response) => {
  try {
    const { user, title, description, duration, intensity, type } = req.body;
    const suggestion = new WorkoutSuggestion({ user, title, description, duration, intensity, type });
    await suggestion.save();
    res.status(201).json(suggestion);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout suggestion' });
  }
};

export const updateWorkoutSuggestion = async (req: Request, res: Response) => {
  try {
    const suggestion = await WorkoutSuggestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!suggestion) {
      res.status(404).json({ error: 'Workout suggestion not found' });
      return;
    }
    res.json(suggestion);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout suggestion' });
  }
};

export const deleteWorkoutSuggestion = async (req: Request, res: Response) => {
  try {
    const suggestion = await WorkoutSuggestion.findByIdAndDelete(req.params.id);
    if (!suggestion) {
      res.status(404).json({ error: 'Workout suggestion not found' });
      return;
    }
    res.json({ message: 'Workout suggestion deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout suggestion' });
  }
};
