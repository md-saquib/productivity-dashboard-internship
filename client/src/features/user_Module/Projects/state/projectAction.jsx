
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../app/config/axiosInstance'

export const userRelatedProjectAction = createAsyncThunk('/api/porject/userRelatedProjects',
    async (_, thunkApi) => {

        try {
            const res = await axiosInstance.get('/api/project/userRelatedProjects')
            console.log(res.data);

            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const createProjectAction = createAsyncThunk('/api/project/createProject',
    async (credentials, thunkApi) => {
        try {
            console.log(credentials);

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