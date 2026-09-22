const express = require('express');
const { 
    getUserRelatedProjects, 
    createProject, 
    getAllProject, 
    getProjectById,
    updateProject,
    deleteProject
} = require('../controller/ProjectController');
const authenticateMe = require('../middleware/authenticate.me');

const router = express.Router()

router.get('/userRelatedProjects', authenticateMe, getUserRelatedProjects)
router.post('/createProject', authenticateMe, createProject)
router.patch('/updateProject/:projectId', authenticateMe, updateProject)
router.delete('/deleteProject/:projectId', authenticateMe, deleteProject)
router.get('/getAllprojects', getAllProject)
router.get('/:projectId', getProjectById)

module.exports = router;