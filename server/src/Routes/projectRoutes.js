
const express = require('express');
const { getUserRelatedProjects, createProject, getAllProject, getProjectById } = require('../controller/ProjectController');
const authenticateMe = require('../middleware/authenticate.me');

const router = express.Router()

router.get('/userRelatedProjects', authenticateMe, getUserRelatedProjects)

router.post('/createProject', authenticateMe, createProject)

router.get('/getAllprojects', getAllProject)

router.get('/:projectId', getProjectById)



module.exports = router;