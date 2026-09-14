import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ['student', 'coach', 'admin'], default: 'student' },
    age: { type: Number, min: 10, max: 100 },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sport: { type: String, required: true, trim: true },
    coach: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const leaderboardSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true, min: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
    points: { type: Number, required: true, min: 0 },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 10 },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard');
export const Workout = mongoose.model('Workout', workoutSchema);

export default {
  User,
  Team,
  Activity,
  Leaderboard,
  Workout,
};
