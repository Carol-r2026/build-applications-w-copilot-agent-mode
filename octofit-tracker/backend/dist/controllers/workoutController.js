"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkoutSuggestion = exports.updateWorkoutSuggestion = exports.createWorkoutSuggestion = exports.getWorkoutSuggestionById = exports.getUserWorkoutSuggestions = exports.getWorkoutSuggestions = void 0;
const WorkoutSuggestion_1 = __importDefault(require("../models/WorkoutSuggestion"));
const getWorkoutSuggestions = async (req, res) => {
    try {
        const suggestions = await WorkoutSuggestion_1.default.find().populate('user');
        res.json(suggestions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout suggestions' });
    }
};
exports.getWorkoutSuggestions = getWorkoutSuggestions;
const getUserWorkoutSuggestions = async (req, res) => {
    try {
        const suggestions = await WorkoutSuggestion_1.default.find({ user: req.params.userId });
        res.json(suggestions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user workout suggestions' });
    }
};
exports.getUserWorkoutSuggestions = getUserWorkoutSuggestions;
const getWorkoutSuggestionById = async (req, res) => {
    try {
        const suggestion = await WorkoutSuggestion_1.default.findById(req.params.id).populate('user');
        if (!suggestion) {
            res.status(404).json({ error: 'Workout suggestion not found' });
            return;
        }
        res.json(suggestion);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout suggestion' });
    }
};
exports.getWorkoutSuggestionById = getWorkoutSuggestionById;
const createWorkoutSuggestion = async (req, res) => {
    try {
        const { user, title, description, duration, intensity, type } = req.body;
        const suggestion = new WorkoutSuggestion_1.default({ user, title, description, duration, intensity, type });
        await suggestion.save();
        res.status(201).json(suggestion);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout suggestion' });
    }
};
exports.createWorkoutSuggestion = createWorkoutSuggestion;
const updateWorkoutSuggestion = async (req, res) => {
    try {
        const suggestion = await WorkoutSuggestion_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!suggestion) {
            res.status(404).json({ error: 'Workout suggestion not found' });
            return;
        }
        res.json(suggestion);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout suggestion' });
    }
};
exports.updateWorkoutSuggestion = updateWorkoutSuggestion;
const deleteWorkoutSuggestion = async (req, res) => {
    try {
        const suggestion = await WorkoutSuggestion_1.default.findByIdAndDelete(req.params.id);
        if (!suggestion) {
            res.status(404).json({ error: 'Workout suggestion not found' });
            return;
        }
        res.json({ message: 'Workout suggestion deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout suggestion' });
    }
};
exports.deleteWorkoutSuggestion = deleteWorkoutSuggestion;
