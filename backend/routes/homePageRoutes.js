const express = require('express');
const router = express.Router();
const controllers = require('../controllers/homePageController');

router.get('/challenges/weekly', controllers.getWeeklyChallenges);
router.post('/workout-log', controllers.submitWorkoutLog);
router.get('/workout-log', controllers.getWorkoutLogs);

module.exports = router;