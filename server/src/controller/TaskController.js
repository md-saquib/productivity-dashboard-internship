const TaskModel = require("../model/task.model")
const { getIO } = require('../config/socket')
const { computeStats } = require('./DashboardController')

// ── Helper: push fresh stats + updated task list to the user's socket room ───
const emitDashboardUpdate = async (userId, event, taskPayload) => {
    try {
        const io = getIO()
        const stats = await computeStats(userId)
        io.to(String(userId)).emit(event, { task: taskPayload, stats })
    } catch (err) {
        // Never let a socket error break the HTTP response
        console.error('[Socket] emitDashboardUpdate failed:', err.message)
    }
}

// ── Create Task ──────────────────────────────────────────────────────────────
const createTask = async (req, res) => {
    try {
        const { title, description, category, priority, dueDate, projectId, status } = req.body

        if (!title || !description || !category || !priority || !dueDate || !projectId) {
            return res.status(400).json({
                success: false,
                message: 'Required to fill All field',
            })
        }

        const task = await TaskModel.create({
            title,
            description,
            category,
            priority,
            dueDate,
            projectId,
            userId: req.user.id,
            status,
        })

        // Respond first, then emit so latency doesn't block the client
        res.status(201).json({
            success: true,
            message: "successfully created Task",
            data: task
        })

        emitDashboardUpdate(req.user.id, 'task:created', task)

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// ── Get All Tasks ─────────────────────────────────────────────────────────────
const getAllTask = async (req, res) => {
    try {
        const userId = req.user.id
        const allTask = await TaskModel.find({ userId }).populate('projectId', 'projectName').populate('userId', 'fullName').lean();

        return res.status(200).json({
            success: true,
            message: 'Task fetched successfully...',
            data: allTask
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// ── Update Task Status ────────────────────────────────────────────────────────
const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params
        const { status } = req.body
        const userId = req.user.id

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            });
        }

        const updateStatus = await TaskModel.findOneAndUpdate(
            { _id: taskId, userId },
            { $set: { status } },
            { new: true }
        )

        if (!updateStatus) {
            return res.status(404).json({
                success: false,
                message: "Task Not found or unauthorized"
            })
        }

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: updateStatus
        })

        emitDashboardUpdate(userId, 'task:updated', updateStatus)

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// ── Update Task (Full) ────────────────────────────────────────────────────────
const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updateData = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully Updated Task',
            data: updatedTask
        });

        emitDashboardUpdate(req.user.id, 'task:updated', updatedTask)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating task",
            error: error.message
        });
    }
}

// ── Delete Task ───────────────────────────────────────────────────────────────
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            deletedTaskId: taskId
        });

        emitDashboardUpdate(req.user.id, 'task:deleted', { _id: taskId })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting task",
            error: error.message
        });
    }
}

module.exports = { createTask, getAllTask, updateTaskStatus, updateTask, deleteTask }