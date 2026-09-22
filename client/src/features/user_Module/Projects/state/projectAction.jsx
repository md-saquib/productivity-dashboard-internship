
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../app/config/axiosInstance'

export const userRelatedProjectAction = createAsyncThunk('/api/porject/userRelatedProjects',
    async (_, thunkApi) => {

        try {
            const res = await axiosInstance.get('/api/project/userRelatedProjects')

            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const createProjectAction = createAsyncThunk('/api/project/createProject',
    async (credentials, thunkApi) => {
        try {

            const res = await axiosInstance.post('/api/project/createProject', credentials)
            return res.data.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const getAllProjectAction = createAsyncThunk('/api/project/getAllProjects',
    async (_, thunkApi) => {
        try {
            const res = await axiosInstance.get('/api/project/getAllProjects')
            return res.data.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const updateProjectAction = createAsyncThunk('/api/project/updateProject',
    async ({ projectId, ...updateData }, thunkApi) => {
        try {
            const res = await axiosInstance.patch(`/api/project/updateProject/${projectId}`, updateData);
            return res.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const deleteProjectAction = createAsyncThunk('/api/project/deleteProject',
    async ({ projectId }, thunkApi) => {
        try {
            const res = await axiosInstance.delete(`/api/project/deleteProject/${projectId}`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)
