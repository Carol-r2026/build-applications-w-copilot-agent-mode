import express from 'express';
import * as activityController from '../controllers/activityController';

const router = express.Router();

router.get('/', activityController.getActivities);
router.get('/:id', activityController.getActivityById);
router.get('/user/:userId', activityController.getUserActivities);
router.post('/', activityController.createActivity);
router.put('/:id', activityController.updateActivity);
router.delete('/:id', activityController.deleteActivity);

export default router;
