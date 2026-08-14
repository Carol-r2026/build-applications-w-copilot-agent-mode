"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const WorkoutSuggestion_1 = __importDefault(require("../models/WorkoutSuggestion"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        // Clear existing data
        await Promise.all([
            User_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            Activity_1.default.deleteMany({}),
            Leaderboard_1.default.deleteMany({}),
            WorkoutSuggestion_1.default.deleteMany({})
        ]);
        console.log('Cleared existing data');
        // Create sample users
        const users = await User_1.default.insertMany([
            {
                username: 'alice_runner',
                email: 'alice@example.com',
                password: 'hashed_password_1',
                firstName: 'Alice',
                lastName: 'Runner'
            },
            {
                username: 'bob_cyclist',
                email: 'bob@example.com',
                password: 'hashed_password_2',
                firstName: 'Bob',
                lastName: 'Cyclist'
            },
            {
                username: 'carol_swimmer',
                email: 'carol@example.com',
                password: 'hashed_password_3',
                firstName: 'Carol',
                lastName: 'Swimmer'
            },
            {
                username: 'david_trainer',
                email: 'david@example.com',
                password: 'hashed_password_4',
                firstName: 'David',
                lastName: 'Trainer'
            },
            {
                username: 'emma_crossfit',
                email: 'emma@example.com',
                password: 'hashed_password_5',
                firstName: 'Emma',
                lastName: 'CrossFit'
            }
        ]);
        console.log('Created 5 users');
        // Create sample teams
        const teams = await Team_1.default.insertMany([
            {
                name: 'Morning Marathon Club',
                description: 'Early birds committed to long-distance running',
                leader: users[0]._id,
                members: [users[0]._id, users[1]._id]
            },
            {
                name: 'Urban Cyclists',
                description: 'City cyclists sharing routes and tips',
                leader: users[1]._id,
                members: [users[1]._id, users[2]._id, users[3]._id]
            },
            {
                name: 'Water Warriors',
                description: 'Swimming enthusiasts improving together',
                leader: users[2]._id,
                members: [users[2]._id, users[4]._id]
            },
            {
                name: 'Strength Squad',
                description: 'CrossFit and strength training team',
                leader: users[3]._id,
                members: [users[3]._id, users[4]._id, users[0]._id]
            }
        ]);
        console.log('Created 4 teams');
        // Create sample activities
        const activities = await Activity_1.default.insertMany([
            {
                user: users[0]._id,
                type: 'running',
                duration: 45,
                distance: 8.5,
                calories: 650,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                user: users[0]._id,
                type: 'running',
                duration: 30,
                distance: 5.2,
                calories: 420,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                user: users[1]._id,
                type: 'cycling',
                duration: 60,
                distance: 35,
                calories: 800,
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
                user: users[1]._id,
                type: 'cycling',
                duration: 45,
                distance: 25,
                calories: 600,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                user: users[2]._id,
                type: 'swimming',
                duration: 50,
                distance: 2.5,
                calories: 700,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                user: users[3]._id,
                type: 'strength',
                duration: 90,
                distance: 0,
                calories: 950,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                user: users[4]._id,
                type: 'crossfit',
                duration: 60,
                distance: 0,
                calories: 850,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            }
        ]);
        console.log('Created 7 activities');
        // Create sample leaderboard entries
        const leaderboard = await Leaderboard_1.default.insertMany([
            { user: users[0]._id, team: teams[0]._id, score: 1070, rank: 1 },
            { user: users[1]._id, team: teams[1]._id, score: 1400, rank: 1 },
            { user: users[2]._id, team: teams[2]._id, score: 700, rank: 1 },
            { user: users[3]._id, team: teams[3]._id, score: 950, rank: 2 },
            { user: users[4]._id, team: teams[3]._id, score: 850, rank: 3 }
        ]);
        console.log('Created 5 leaderboard entries');
        // Create sample workout suggestions
        const workouts = await WorkoutSuggestion_1.default.insertMany([
            {
                user: users[0]._id,
                title: 'Morning 10K Run',
                description: 'Start with warm-up, run 10km at comfortable pace',
                duration: 60,
                intensity: 'medium',
                type: 'running'
            },
            {
                user: users[0]._id,
                title: 'Speed Training',
                description: '8x800m intervals with recovery jogs',
                duration: 45,
                intensity: 'high',
                type: 'running'
            },
            {
                user: users[1]._id,
                title: 'Mountain Bike Adventure',
                description: 'Trail cycling with elevation gains',
                duration: 90,
                intensity: 'high',
                type: 'cycling'
            },
            {
                user: users[2]._id,
                title: 'Endurance Swim',
                description: 'Continuous swimming for 1 hour',
                duration: 60,
                intensity: 'medium',
                type: 'swimming'
            },
            {
                user: users[3]._id,
                title: 'Full Body Strength',
                description: 'Squats, deadlifts, bench press, rows',
                duration: 90,
                intensity: 'high',
                type: 'strength'
            },
            {
                user: users[4]._id,
                title: 'WOD: Cindy',
                description: 'AMRAP 20min: 5 pull-ups, 10 push-ups, 15 air squats',
                duration: 20,
                intensity: 'high',
                type: 'crossfit'
            }
        ]);
        console.log('Created 6 workout suggestions');
        console.log('\n✅ Database seeding complete!');
        console.log(`📊 Summary:`);
        console.log(`   - Users: ${users.length}`);
        console.log(`   - Teams: ${teams.length}`);
        console.log(`   - Activities: ${activities.length}`);
        console.log(`   - Leaderboard entries: ${leaderboard.length}`);
        console.log(`   - Workout suggestions: ${workouts.length}`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
