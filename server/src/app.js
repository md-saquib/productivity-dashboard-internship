const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');
const taskRoute = require('./Routes/taskRoutes');
const projectRoutes = require('./Routes/projectRoutes');
const dashboardRoutes = require('./Routes/dashboardRoutes');
const config = require('./config/config');

const app = express();

// Trust reverse proxy (Render, Heroku, etc.) for HTTPS headers and cookies
app.set('trust proxy', 1);



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoute);
app.use('/api/project', projectRoutes);
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;
