import { Request, Response } from 'express';
import Activity from '../models/Activity';

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user');
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
};

export const getUserActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ user: req.params.userId });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activities' });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { user, type, duration, distance, calories, date } = req.body;
    const activity = new Activity({ user, type, duration, distance, calories, date });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
};
