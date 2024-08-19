// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/jwtAuth')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/completed-skills', userController.getCompletedSkills);
router.get('/objectives', authenticateJWT, userController.getObjectives);
router.get('/goals', authenticateJWT, userController.getGoals);

router.get('/challenges', authenticateJWT, userController.getChallenges);
router.post('/rerollChallenges', authenticateJWT, userController.rerollChallenges);

router.post('/create-log', authenticateJWT, userController.createLog);
router.get('/get-log', authenticateJWT, userController.getWorkoutLog);
router.put('/update-log', authenticateJWT, userController.updateLog);

module.exports = router;
