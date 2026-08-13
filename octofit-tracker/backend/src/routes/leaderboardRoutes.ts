import express from 'express';
import * as leaderboardController from '../controllers/leaderboardController';

const router = express.Router();

router.get('/', leaderboardController.getLeaderboard);
router.get('/team/:teamId', leaderboardController.getTeamLeaderboard);
router.get('/user/:userId', leaderboardController.getUserLeaderboardPosition);
router.post('/', leaderboardController.createLeaderboardEntry);
router.put('/:id', leaderboardController.updateLeaderboardEntry);

export default router;
