// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/jwtAuth')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

router.get('/completed-skills', userController.getCompletedSkills);
router.get('/all-skills', authenticateJWT, userController.getAllSkills);
router.put('/skills/:skillId', authenticateJWT, userController.updateSkillStatus);

router.get('/objectives', authenticateJWT, userController.getObjectives);
router.get('/goals', authenticateJWT, userController.getGoals);

router.get('/challenges', authenticateJWT, userController.getChallenges);
router.post('/rerollChallenges', authenticateJWT, userController.rerollChallenges);
router.post('/submitChallenges', authenticateJWT, userController.submitChallenges);

router.get('/status', authenticateJWT, userController.getUserStatus);

module.exports = router;
