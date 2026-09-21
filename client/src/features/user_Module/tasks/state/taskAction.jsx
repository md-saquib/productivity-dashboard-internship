import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../app/config/axiosInstance";

export const createTaskAction = createAsyncThunk('/api/task/createTask',
    async (credentials, { rejectWithValue }) => {

        try {

            const res = await axiosInstance.post('/api/task/createTask', credentials);
            return res.data

        } catch (error) {
            return rejectWithValue(error.message)
        }

    }
)

export const getAllTaskAction = createAsyncThunk('/api/task/getAllTask',
    async (_, { rejectWithValue }) => {

        try {

            const res = await axiosInstance.get('/api/task/getAllTask');
            return res.data

        } catch (error) {
            return rejectWithValue(error.message)
        }

    }
)

export const updateTaskStatus = createAsyncThunk('/api/task/updateTask',
    async ({ taskId, status }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.patch(`/api/task/updateTask/${taskId}/status`, { status })
            return res.data.success
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (credentials, { rejectWithValue }) => {
        try {
            // FIX: Removed the trailing space after ${credentials.taskId}
            const res = await axiosInstance.patch(`/api/task/updateTask/${credentials.taskId}`, credentials);
            return res.data;
        } catch (error) {
            // FIX: Extract backend error message if available
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async ({ taskId }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`/api/task/deleteTask/${taskId}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);