"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeamById = exports.getTeams = void 0;
const Team_1 = __importDefault(require("../models/Team"));
const getTeams = async (req, res) => {
    try {
        const teams = await Team_1.default.find().populate('leader members');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
};
exports.getTeams = getTeams;
const getTeamById = async (req, res) => {
    try {
        const team = await Team_1.default.findById(req.params.id).populate('leader members');
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
};
exports.getTeamById = getTeamById;
const createTeam = async (req, res) => {
    try {
        const { name, description, leader } = req.body;
        const team = new Team_1.default({ name, description, leader, members: [leader] });
        await team.save();
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
};
exports.createTeam = createTeam;
const updateTeam = async (req, res) => {
    try {
        const team = await Team_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
};
exports.updateTeam = updateTeam;
const deleteTeam = async (req, res) => {
    try {
        const team = await Team_1.default.findByIdAndDelete(req.params.id);
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json({ message: 'Team deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
};
exports.deleteTeam = deleteTeam;
