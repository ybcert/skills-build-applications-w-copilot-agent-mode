"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.Leaderboard = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ['student', 'coach', 'admin'], default: 'student' },
    age: { type: Number, min: 10, max: 100 },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    team: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team', default: null },
}, { timestamps: true });
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    sport: { type: String, required: true, trim: true },
    coach: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    members: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const activitySchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team', default: null },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.default.Schema({
    rank: { type: Number, required: true, min: 1 },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team', default: null },
    points: { type: Number, required: true, min: 0 },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 10 },
    description: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.Leaderboard = mongoose_1.default.model('Leaderboard', leaderboardSchema, 'leaderboard');
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
exports.default = {
    User: exports.User,
    Team: exports.Team,
    Activity: exports.Activity,
    Leaderboard: exports.Leaderboard,
    Workout: exports.Workout,
};
