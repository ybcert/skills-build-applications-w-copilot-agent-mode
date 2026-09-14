import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Team, Activity, Leaderboard, Workout } from './models';

dotenv.config();

const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const apiBaseUrl = getApiBaseUrl();

const app = express();
const port = Number(process.env.PORT || 8000);
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

const buildResponse = <T>(resource: string, items: T[]) => ({
  message: `${resource} data`,
  count: items.length,
  results: items,
  apiUrl: apiBaseUrl,
});

app.get('/', (_req, res) => {
  res.json({
    message: 'Octofit Tracker API is running.',
    apiUrl: apiBaseUrl,
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(buildResponse('Users', users));
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).populate('members').lean();
  res.json(buildResponse('Teams', teams));
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).populate(['user', 'team']).lean();
  res.json(buildResponse('Activities', activities));
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).populate(['user', 'team']).sort({ rank: 1 }).lean();
  res.json(buildResponse('Leaderboard', leaderboard));
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(buildResponse('Workouts', workouts));
});

async function startServer() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB:', connectionString);

    app.listen(port, () => {
      console.log(`Octofit Tracker API listening on http://localhost:${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

startServer();
