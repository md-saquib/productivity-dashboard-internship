import { createSlice } from "@reduxjs/toolkit"
import { createTaskAction, getAllTaskAction, deleteTask, updateTask } from "./taskAction"


const taskSlice = createSlice({
    name: "task",
    initialState: {
        task: null,
        allTask: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ── Create Task ──
            .addCase(createTaskAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTaskAction.fulfilled, (state, action) => {
                state.loading = false;
                state.task = action.payload;
            })
            .addCase(createTaskAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.data || action.payload;
            })
            // ── Get All Tasks ──
            .addCase(getAllTaskAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTaskAction.fulfilled, (state, action) => {
                state.loading = false;
                state.allTask = action.payload;
            })
            .addCase(getAllTaskAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.data || action.payload;
            })
            // ── Update Task ──
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ── Delete Task ──
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { } = taskSlice.actions
export default taskSlice.reducer