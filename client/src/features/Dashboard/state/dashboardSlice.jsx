import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardStats, fetchAIInsight } from './dashboardAction';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        stats: {
            activeProjects: 0,
            tasksCompleted: 0,
            pendingReviews: 0,
            weeklyProductivity: 0,
        },
        loading: false,
        error: null,
        aiInsight: null,
        insightLoading: false,
        insightError: null,
    },
    reducers: {
    
        setStats(state, action) {
            state.stats = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // ── fetchDashboardStats ───────────────────────────────────────────
            .addCase(fetchDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ── fetchAIInsight ────────────────────────────────────────────────
            .addCase(fetchAIInsight.pending, (state) => {
                state.insightLoading = true;
                state.insightError = null;
            })
            .addCase(fetchAIInsight.fulfilled, (state, action) => {
                state.insightLoading = false;
                state.aiInsight = action.payload;
            })
            .addCase(fetchAIInsight.rejected, (state, action) => {
                state.insightLoading = false;
                state.insightError = action.payload;
            });
    },
});

export const { setStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
