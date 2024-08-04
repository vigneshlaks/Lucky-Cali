const express = require('express');
const router = express.Router();
const controllers = require('../controllers/homePageController');

// Routes
router.get('/challenges/weekly', controllers.getWeeklyChallenges);
router.post('/workout-log', controllers.submitWorkoutLog);
router.get('/workout-log', controllers.getWorkoutLogs);
router.get('/workout-heatmap', controllers.getHeatmapData);
router.get('/workout-stats', controllers.getRadarChartData);

module.exports = router;