const express = require('express');
const { getDashboardStats, getAIInsight, aiGenerateTask } = require('../controller/DashboardController');
const authenticateMe = require('../middleware/authenticate.me');

const router = express.Router();

// Endpoints require the user to be authenticated
router.get('/stats', authenticateMe, getDashboardStats);
router.get('/insight', authenticateMe, getAIInsight);
router.post('/ai-generate-task', authenticateMe, aiGenerateTask);

module.exports = router;

