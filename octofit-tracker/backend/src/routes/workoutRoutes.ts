import express from 'express';
import * as workoutController from '../controllers/workoutController';

const router = express.Router();

router.get('/', workoutController.getWorkoutSuggestions);
router.get('/:id', workoutController.getWorkoutSuggestionById);
router.get('/user/:userId', workoutController.getUserWorkoutSuggestions);
router.post('/', workoutController.createWorkoutSuggestion);
router.put('/:id', workoutController.updateWorkoutSuggestion);
router.delete('/:id', workoutController.deleteWorkoutSuggestion);

export default router;
