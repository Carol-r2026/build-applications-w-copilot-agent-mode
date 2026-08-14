"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getUserActivities = exports.getActivityById = exports.getActivities = void 0;
const Activity_1 = __importDefault(require("../models/Activity"));
const getActivities = async (req, res) => {
    try {
        const activities = await Activity_1.default.find().populate('user');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
};
exports.getActivities = getActivities;
const getActivityById = async (req, res) => {
    try {
        const activity = await Activity_1.default.findById(req.params.id).populate('user');
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
};
exports.getActivityById = getActivityById;
const getUserActivities = async (req, res) => {
    try {
        const activities = await Activity_1.default.find({ user: req.params.userId });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user activities' });
    }
};
exports.getUserActivities = getUserActivities;
const createActivity = async (req, res) => {
    try {
        const { user, type, duration, distance, calories, date } = req.body;
        const activity = new Activity_1.default({ user, type, duration, distance, calories, date });
        await activity.save();
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
};
exports.createActivity = createActivity;
const updateActivity = async (req, res) => {
    try {
        const activity = await Activity_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
};
exports.updateActivity = updateActivity;
const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity_1.default.findByIdAndDelete(req.params.id);
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.json({ message: 'Activity deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
};
exports.deleteActivity = deleteActivity;
