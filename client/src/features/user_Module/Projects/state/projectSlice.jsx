import { createSlice } from "@reduxjs/toolkit";
import { createProjectAction, getAllProjectAction, userRelatedProjectAction } from "./projectAction";


const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projects: [],
        allProjects: [],
        userRelatedProjects: [],
        loading: false,
        error: null

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createProjectAction.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(createProjectAction.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload.data || action.payload

            })
            .addCase(createProjectAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })
            .addCase(userRelatedProjectAction.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userRelatedProjectAction.fulfilled, (state, action) => {
                state.loading = false
                state.userRelatedProjects = action.payload

            })
            .addCase(userRelatedProjectAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })
            .addCase(getAllProjectAction.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllProjectAction.fulfilled, (state, action) => {
                state.loading = false
                state.allProjects = action.payload.data || action.payload

            })
            .addCase(getAllProjectAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })
    }
})

export const { } = projectSlice.actions
export default projectSlice.reducer