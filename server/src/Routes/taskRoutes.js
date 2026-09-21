
const express = require('express');
const { getAllTask, createTask, updateTaskStatus, updateTask, deleteTask } = require('../controller/TaskController');
const authenticateMe = require('../middleware/authenticate.me');

const router = express.Router()

router.get('/getAllTask', authenticateMe, getAllTask)

router.post('/createTask', authenticateMe, createTask)
 
router.patch('/updateTask/:taskId/status', authenticateMe, updateTaskStatus)

router.patch('/updateTask/:taskId', authenticateMe, updateTask)

router.delete('/deleteTask/:taskId', authenticateMe, deleteTask)



module.exports = router;