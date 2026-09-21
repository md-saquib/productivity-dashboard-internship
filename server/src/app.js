const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./Routes/authRoutes');
const taskRoute = require('./Routes/taskRoutes');
const projectRoutes = require('./Routes/projectRoutes');

const app = express()

// Middleware (must come before routes)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/task', taskRoute)
app.use('/api/project', projectRoutes)


module.exports = app;

