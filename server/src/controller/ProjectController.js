const mongoose = require('mongoose');
const ProjectModel = require('../model/project.model');

// GET: Fetch all projects belonging to a specific user
const getUserRelatedProjects = async (req, res) => {
    try {
        const userId = req.user.id

        const userProjects = await ProjectModel.find({ userId }).populate('userId', 'fullName email')

        return res.status(200).json({
            success: true,
            count: userProjects.length,
            data: userProjects
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch user projects',
            error: error.message
        });
    }
};

// POST: Create a new project
const createProject = async (req, res) => {
    try {
        const { projectName, repoUrl, teamLeads, techStack, visibility } = req.body;

        if (!projectName || !repoUrl || !teamLeads || !techStack || !visibility) {
            return res.status(400).json({
                success: false,
                message: 'All fields (projectName, repoUrl, teamLeads, techStack, visibility, userId) are required'
            });
        }



        const newProject = await ProjectModel.create({
            projectName,
            repoUrl,
            teamLeads,
            techStack,
            visibility,
            userId: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: newProject
        });
    } catch (error) {


        return res.status(500).json({
            success: false,
            message: 'Failed to create project',
            error: error.message
        });
    }
};

// GET: Fetch all projects 
const getAllProject = async (req, res) => {
    try {

        const allProjects = await ProjectModel.find().populate('userId', 'fullName email')

        return res.status(200).json({
            success: true,
            count: allProjects.length,
            data: allProjects
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch projects',
            error: error.message
        });
    }
};

// GET: Fetch a single project by ID
const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await ProjectModel.findById(projectId).populate('userId', 'fullName email');

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch project',
            error: error.message
        });
    }
};

module.exports = {
    getUserRelatedProjects,
    createProject,
    getAllProject,
    getProjectById
};