# OctoFit Tracker Backend (Logic Tier)

Node.js/Express API for the OctoFit Tracker multi-tier application.

## Project Structure

```
src/
├── server.ts              # Main Express application
├── config/
│   └── database.ts        # MongoDB configuration
├── models/                # Mongoose schemas
│   ├── User.ts
│   ├── Team.ts
│   ├── Activity.ts
│   ├── Leaderboard.ts
│   └── WorkoutSuggestion.ts
├── controllers/           # Request handlers
│   ├── userController.ts
│   ├── teamController.ts
│   ├── activityController.ts
│   ├── leaderboardController.ts
│   └── workoutController.ts
├── routes/                # API route definitions
│   ├── userRoutes.ts
│   ├── teamRoutes.ts
│   ├── activityRoutes.ts
│   ├── leaderboardRoutes.ts
│   └── workoutRoutes.ts
└── scripts/
    └── seed.ts            # Database seeding script
```

## API Endpoints

### Users (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `POST /` - Create new user
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

### Teams (`/api/teams`)
- `GET /` - Get all teams
- `GET /:id` - Get team by ID
- `POST /` - Create new team
- `PUT /:id` - Update team
- `DELETE /:id` - Delete team

### Activities (`/api/activities`)
- `GET /` - Get all activities
- `GET /:id` - Get activity by ID
- `GET /user/:userId` - Get activities by user
- `POST /` - Create new activity
- `PUT /:id` - Update activity
- `DELETE /:id` - Delete activity

### Leaderboard (`/api/leaderboard`)
- `GET /` - Get global leaderboard
- `GET /team/:teamId` - Get team leaderboard
- `GET /user/:userId` - Get user leaderboard position
- `POST /` - Create leaderboard entry
- `PUT /:id` - Update leaderboard entry

### Workouts (`/api/workouts`)
- `GET /` - Get all workout suggestions
- `GET /:id` - Get workout suggestion by ID
- `GET /user/:userId` - Get user workout suggestions
- `POST /` - Create new workout suggestion
- `PUT /:id` - Update workout suggestion
- `DELETE /:id` - Delete workout suggestion

## Scripts

```bash
# Development with auto-reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start
```

## Configuration

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

### Codespaces Support
The API automatically detects Codespaces environment and constructs the appropriate API URL using `CODESPACE_NAME`.

## Stack

- **Runtime**: Node.js (LTS)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Port**: 8000 (configurable via PORT env var)

## Database

MongoDB connection is configured in `src/config/database.ts`. Ensure MongoDB is running on `localhost:27017` or update the `MONGODB_URI` environment variable.

## Health Check

```bash
curl http://localhost:8000/api/health
```

Response:
```json
{
  "status": "ok",
  "message": "OctoFit Tracker API is running",
  "apiUrl": "http://localhost:8000",
  "codespace": "local"
}
```
