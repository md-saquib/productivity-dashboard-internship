import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../app/config/axiosInstance';

/**
 * Fetches the live dashboard stat cards:
 * { activeProjects, tasksCompleted, pendingReviews, weeklyProductivity }
 */
export const fetchDashboardStats = createAsyncThunk(
    'dashboard/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/api/dashboard/stats');
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

/**
 * Fetches a Gemini AI-generated insight string.
 * Cached on the server for 5 minutes — calling rapidly won't re-bill quota.
 */
export const fetchAIInsight = createAsyncThunk(
    'dashboard/fetchInsight',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/api/dashboard/insight');
            return res.data.data.insight;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
