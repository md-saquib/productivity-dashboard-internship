const mongoose = require('mongoose');
const ProjectModel = require('../model/project.model');
const { getIO } = require('../config/socket');
const { computeStats } = require('./DashboardController');

// ── Helper: emit project events + fresh stats to the user's room ─────────────
const emitProjectUpdate = async (userId, event, project) => {
    try {
        const io = getIO();
        const stats = await computeStats(userId);
        io.to(String(userId)).emit(event, { project, stats });
    } catch (err) {
        console.error('[Socket] emitProjectUpdate failed:', err.message);
    }
};

// ── GET: Fetch all projects belonging to a specific user ─────────────────────
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

// ── POST: Create a new project ────────────────────────────────────────────────
const createProject = async (req, res) => {
    try {
        const { projectName, repoUrl, teamLeads, techStack, visibility, progress } = req.body;

        if (!projectName || !repoUrl || !teamLeads || !techStack || !visibility) {
            return res.status(400).json({
                success: false,
                message: 'All fields (projectName, repoUrl, teamLeads, techStack, visibility) are required'
            });
        }

        const newProject = await ProjectModel.create({
            projectName,
            repoUrl,
            teamLeads,
            techStack,
            visibility,
            progress: progress ?? 0,
            userId: req.user.id
        });

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: newProject
        });

        emitProjectUpdate(req.user.id, 'project:created', newProject);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create project',
            error: error.message
        });
    }
};

// ── GET: Fetch all projects ───────────────────────────────────────────────────
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

// ── GET: Fetch a single project by ID ─────────────────────────────────────────
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

// ── PATCH: Update a project ──────────────────────────────────────────────────
const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;
        const updateData = req.body;

        const updatedProject = await ProjectModel.findOneAndUpdate(
            { _id: projectId, userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found or unauthorized'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject
        });

        emitProjectUpdate(userId, 'project:updated', updatedProject);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update project',
            error: error.message
        });
    }
};

// ── DELETE: Delete a project ─────────────────────────────────────────────────
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;

        const deletedProject = await ProjectModel.findOneAndDelete({ _id: projectId, userId });

        if (!deletedProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found or unauthorized'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully',
            deletedProjectId: projectId
        });

        emitProjectUpdate(userId, 'project:deleted', { _id: projectId });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete project',
            error: error.message
        });
    }
};

module.exports = {
    getUserRelatedProjects,
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject
};