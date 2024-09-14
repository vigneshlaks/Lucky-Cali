const express = require('express');
const router = express.Router();
const competeController = require('../controllers/competeController');
const authenticateJWT = require('../middleware/jwtAuth');

router.get('/leaderboard', authenticateJWT, competeController.getLeaderboard);
router.post('/enter', authenticateJWT, competeController.enterContest);

module.exports = router;
