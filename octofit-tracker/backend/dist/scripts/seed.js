"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.Leaderboard.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const users = await models_1.User.insertMany([
            {
                name: 'Ava Patel',
                email: 'ava.patel@example.com',
                role: 'student',
                age: 16,
                fitnessLevel: 'advanced',
            },
            {
                name: 'Leo Martinez',
                email: 'leo.martinez@example.com',
                role: 'student',
                age: 15,
                fitnessLevel: 'intermediate',
            },
            {
                name: 'Mia Johnson',
                email: 'mia.johnson@example.com',
                role: 'student',
                age: 17,
                fitnessLevel: 'advanced',
            },
            {
                name: 'Coach Williams',
                email: 'coach.williams@example.com',
                role: 'coach',
                age: 35,
                fitnessLevel: 'advanced',
            },
        ]);
        const teams = await models_1.Team.insertMany([
            {
                name: 'Velocity Squad',
                sport: 'Running',
                coach: 'Coach Williams',
                city: 'Mergington',
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Peak Performance',
                sport: 'Strength',
                coach: 'Coach Williams',
                city: 'Mergington',
                members: [users[2]._id],
            },
        ]);
        await models_1.User.updateMany({ _id: { $in: users.map((user) => user._id) } }, {
            $set: {
                team: teams[0]._id,
            },
        });
        const seededUsers = await models_1.User.find({}).lean();
        await models_1.Activity.insertMany([
            {
                user: seededUsers[0]._id,
                team: teams[0]._id,
                type: 'running',
                durationMinutes: 42,
                caloriesBurned: 410,
                distanceKm: 6.1,
                date: new Date('2026-09-10T06:30:00Z'),
            },
            {
                user: seededUsers[1]._id,
                team: teams[0]._id,
                type: 'strength',
                durationMinutes: 55,
                caloriesBurned: 520,
                distanceKm: 0,
                date: new Date('2026-09-11T17:15:00Z'),
            },
            {
                user: seededUsers[2]._id,
                team: teams[1]._id,
                type: 'cycling',
                durationMinutes: 38,
                caloriesBurned: 390,
                distanceKm: 12.4,
                date: new Date('2026-09-12T18:00:00Z'),
            },
        ]);
        await models_1.Leaderboard.insertMany([
            {
                rank: 1,
                user: seededUsers[0]._id,
                team: teams[0]._id,
                points: 1240,
                streak: 8,
            },
            {
                rank: 2,
                user: seededUsers[1]._id,
                team: teams[0]._id,
                points: 1180,
                streak: 6,
            },
            {
                rank: 3,
                user: seededUsers[2]._id,
                team: teams[1]._id,
                points: 1105,
                streak: 5,
            },
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'HIIT Burn',
                focus: 'Cardio and intervals',
                difficulty: 'intermediate',
                durationMinutes: 30,
                description: 'A fast-paced interval session designed to build stamina and improve explosive output.',
            },
            {
                title: 'Mobility Reset',
                focus: 'Recovery and flexibility',
                difficulty: 'beginner',
                durationMinutes: 20,
                description: 'Low-impact mobility work to improve range of motion and recovery between training days.',
            },
            {
                title: 'Power Circuit',
                focus: 'Strength and endurance',
                difficulty: 'advanced',
                durationMinutes: 45,
                description: 'Strength-based circuit combining squats, presses, and core work for full-body power.',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
