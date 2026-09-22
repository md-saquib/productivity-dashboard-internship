const { Types } = require('mongoose');
const ProjectModel = require('../model/project.model');
const TaskModel = require('../model/task.model');
const { generateInsight, generateTaskWithAI } = require('../services/geminiService');

// ── Helper: build a "floor" ObjectId from a Date ─────────────────────────────
const objectIdFromDate = (date) => {
    const hexSeconds = Math.floor(date.getTime() / 1000)
        .toString(16)
        .padStart(8, '0');
    return new Types.ObjectId(hexSeconds + '0000000000000000');
};

// ── Helper: compute live stats & recent activity for a given userId ──────────
const computeStats = async (userId) => {
    const now = new Date();

    // Start of the current week — Sunday 00:00:00 local time
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const weekStartId = objectIdFromDate(startOfWeek);

    const thisWeekFilter = (extra = {}) => ({
        userId,
        ...extra,
        $or: [
            { createdAt: { $gte: startOfWeek } },
            { createdAt: { $exists: false }, _id: { $gte: weekStartId } },
        ],
    });

    const [
        activeProjects,
        tasksCompleted,
        pendingReviews,
        totalTasksThisWeek,
        doneTasksThisWeek,
        recentTasks,
        recentProjects,
    ] = await Promise.all([
        ProjectModel.countDocuments({ userId, status: 'Active' }),
        TaskModel.countDocuments({ userId, status: 'done' }),
        TaskModel.countDocuments({ userId, status: 'review' }),
        TaskModel.countDocuments(thisWeekFilter()),
        TaskModel.countDocuments(thisWeekFilter({ status: 'done' })),
        TaskModel.find({ userId })
            .sort({ updatedAt: -1, _id: -1 })
            .limit(5)
            .populate('projectId', 'projectName')
            .lean(),
        ProjectModel.find({ userId })
            .sort({ updatedAt: -1, _id: -1 })
            .limit(3)
            .lean(),
    ]);

    const weeklyProductivity =
        totalTasksThisWeek > 0
            ? Math.round((doneTasksThisWeek / totalTasksThisWeek) * 100)
            : 0;

    // Combine tasks and projects into an integrated Recent Activity feed
    const activities = [
        ...recentTasks.map((t) => ({
            id: t._id,
            type: 'task',
            title: t.title,
            status: t.status,
            category: t.category,
            project: t.projectId?.projectName || 'General',
            timestamp: t.updatedAt || t._id.getTimestamp(),
        })),
        ...recentProjects.map((p) => ({
            id: p._id,
            type: 'project',
            title: p.projectName,
            status: p.status,
            category: 'Project',
            project: p.projectName,
            timestamp: p.updatedAt || p._id.getTimestamp(),
        })),
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 6);

    return {
        activeProjects,
        tasksCompleted,
        pendingReviews,
        weeklyProductivity,
        recentActivity: activities,
    };
};

// ── GET /api/dashboard/stats ─────────────────────────────────────────────────
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await computeStats(userId);

        return res.status(200).json({ success: true, data: stats });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard stats',
            error: error.message,
        });
    }
};

// ── GET /api/dashboard/insight ───────────────────────────────────────────────
const getAIInsight = async (req, res) => {
    try {
        const userId = req.user.id;

        const [stats, projects, tasks] = await Promise.all([
            computeStats(userId),
            ProjectModel.find({ userId }).sort({ updatedAt: -1 }).limit(5).lean(),
            TaskModel.find({ userId }).sort({ _id: -1 }).limit(20).lean(),
        ]);

        const insight = await generateInsight(String(userId), { stats, projects, tasks });

        return res.status(200).json({ success: true, data: { insight } });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to generate AI insight',
            error: error.message,
        });
    }
};

// ── POST /api/dashboard/ai-generate-task ────────────────────────────────────
const aiGenerateTask = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'A prompt or brief task summary is required',
            });
        }

        const taskDetails = await generateTaskWithAI(prompt);

        return res.status(200).json({
            success: true,
            data: taskDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to generate AI task suggestions',
            error: error.message,
        });
    }
};

module.exports = { getDashboardStats, getAIInsight, computeStats, aiGenerateTask };
