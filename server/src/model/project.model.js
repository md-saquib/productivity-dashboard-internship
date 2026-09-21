const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    repoUrl: {
      type: String,
      required: [true, 'Repository URL is required'],
      trim: true,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL']
    },
    teamLeads: {
      type: [String], // Array allows multiple leads; use String if it is strictly one person
      required: true,
      default: []
    },
    techStack: {
      type: [String], // Strongly-typed array of strings instead of generic Array
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'Tech stack must contain at least one technology'
      }
    },
    visibility: {
      type: String,
      required: true,
      enum: ['public', 'private'],
      default: 'public',
      lowercase: true
    },
    status: {
      type: String,
      required: true,
      enum: ["Not Started", 'Active', 'Pending', 'On Hold', 'Completed'],
      default: 'Active',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User reference is required'],
      ref: 'registerUser',
      index: true // Speeds up queries filtering projects by owner
    }
  },
  {
    timestamps: true // Automatically manages createdAt and updatedAt
  }
);

const ProjectModel = mongoose.model('project', projectSchema);

module.exports = ProjectModel;