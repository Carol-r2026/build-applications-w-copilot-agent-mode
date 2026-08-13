"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const leaderboardRoutes_1 = __importDefault(require("./routes/leaderboardRoutes"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Connect to MongoDB
mongoose_1.default
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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
app.use('/api/users', userRoutes_1.default);
app.use('/api/teams', teamRoutes_1.default);
app.use('/api/activities', activityRoutes_1.default);
app.use('/api/leaderboard', leaderboardRoutes_1.default);
app.use('/api/workouts', workoutRoutes_1.default);
app.listen(port, () => {
    console.log(`🚀 OctoFit Tracker API listening on port ${port}`);
    console.log(`🌐 API URL: ${getApiUrl()}`);
    console.log(`🎯 Codespace: ${process.env.CODESPACE_NAME || 'local'}`);
});
exports.default = app;
