const mongoose = require('mongoose')

/*
{title: 'dashboard', description: 'please make dashboard as industry level ', category: 'Frontend Development', priority: 'Normal', assignee: 'Alex M.', …}


*/

const taskSchmea = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'project'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'registerUser'
    },
    status: {
        type: String,
        required: true,
        enum: ["todo", "in-progress", "review", "done"]
    }

})

const TaskModel = mongoose.model('task', taskSchmea)

module.exports = TaskModel;