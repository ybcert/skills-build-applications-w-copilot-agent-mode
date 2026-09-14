"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = require("./config/api");
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
app.use(express_1.default.json());
const buildResponse = (resource, items) => ({
    message: `${resource} data`,
    count: items.length,
    results: items,
    apiUrl: api_1.apiBaseUrl,
});
app.get('/', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API is running.',
        apiUrl: api_1.apiBaseUrl,
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(buildResponse('Users', users));
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.Team.find({}).populate('members').lean();
    res.json(buildResponse('Teams', teams));
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.Activity.find({}).populate(['user', 'team']).lean();
    res.json(buildResponse('Activities', activities));
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.Leaderboard.find({}).populate(['user', 'team']).sort({ rank: 1 }).lean();
    res.json(buildResponse('Leaderboard', leaderboard));
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(buildResponse('Workouts', workouts));
});
async function startServer() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to MongoDB:', connectionString);
        app.listen(port, () => {
            console.log(`Octofit Tracker API listening on http://localhost:${port}`);
            console.log(`API base URL: ${api_1.apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
startServer();
