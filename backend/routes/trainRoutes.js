const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const authenticateJWT = require('../middleware/jwtAuth')

// Route to fetch all posts for the authenticated user
router.get('/posts', authenticateJWT, trainController.getPosts);
router.get('/posts/:id', trainController.getPostById);



router.get('/logs', authenticateJWT, trainController.getAllUserLogs);
router.get('/logs/today', authenticateJWT, trainController.getTodayLog);
router.get('/logs/:id', trainController.getLogById);

router.post('/logs', authenticateJWT, trainController.createLog);
router.put('/logs', authenticateJWT, trainController.updateLog);

module.exports = router;