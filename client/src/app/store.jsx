import authReducer from '../features/auth/state/authSlice'
import themeReducer from '../features/auth/state/themeSlice'
import { configureStore, } from '@reduxjs/toolkit'
import projectReducer from '../features/user_Module/Projects/state/projectSlice'
import taskReducer from '../features/user_Module/tasks/state/taskSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        project: projectReducer,
        task: taskReducer,
    }
})