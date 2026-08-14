"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeaderboardEntry = exports.createLeaderboardEntry = exports.getUserLeaderboardPosition = exports.getTeamLeaderboard = exports.getLeaderboard = void 0;
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find()
            .sort({ score: -1 })
            .populate('user team');
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
};
exports.getLeaderboard = getLeaderboard;
const getTeamLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find({ team: req.params.teamId })
            .sort({ score: -1 })
            .populate('user');
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
};
exports.getTeamLeaderboard = getTeamLeaderboard;
const getUserLeaderboardPosition = async (req, res) => {
    try {
        const entry = await Leaderboard_1.default.findOne({ user: req.params.userId })
            .populate('user team');
        if (!entry) {
            res.status(404).json({ error: 'User not found on leaderboard' });
            return;
        }
        res.json(entry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard position' });
    }
};
exports.getUserLeaderboardPosition = getUserLeaderboardPosition;
const createLeaderboardEntry = async (req, res) => {
    try {
        const { user, team, score } = req.body;
        const entry = new Leaderboard_1.default({ user, team, score });
        await entry.save();
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create leaderboard entry' });
    }
};
exports.createLeaderboardEntry = createLeaderboardEntry;
const updateLeaderboardEntry = async (req, res) => {
    try {
        const entry = await Leaderboard_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entry) {
            res.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        res.json(entry);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update leaderboard entry' });
    }
};
exports.updateLeaderboardEntry = updateLeaderboardEntry;
