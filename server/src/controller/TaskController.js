const TaskModel = require("../model/task.model")



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

        return res.status(201).json({
            success: true,
            message: "successfully created Task",
            data: task
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }

}



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

        const updateStatus = await TaskModel.findOneAndUpdate({ _id: taskId, userId }, { $set: { status } })

        if (!updateStatus) {

            return res.status(404).json({
                success: false,
                message: "Task Not found or unautharized"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Status update successfully..",
            data: updateStatus
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const updateTask = async (req, res) => {

    try {
        const { taskId } = req.params;
        const updateData = req.body;

        // Update the task in the database
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true, runValidators: true } // new: true returns the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully Update Task',
            data: updateData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating task",
            error: error.message
        });
    }

}

const deleteTask = async (req, res) => {

    try {
        const { taskId } = req.params;

        // Delete the task from the database
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting task",
            error: error.message
        });
    }
}




module.exports = { createTask, getAllTask, updateTaskStatus, updateTask, deleteTask }