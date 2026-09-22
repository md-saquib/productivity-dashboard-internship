import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { fetchDashboardStats, fetchAIInsight } from "../../state/dashboardAction";
import { userRelatedProjectAction } from "../../../user_Module/Projects/state/projectAction";
import { getAllTaskAction } from "../../../user_Module/tasks/state/taskAction";

// Custom Hooks
import useDashboardSocket from "../../hooks/useDashboardSocket";

// Sub-components
import AiInsightBanner from "../components/AiInsightBanner";
import StatsGrid from "../components/StatsGrid";
import ActiveProjectsPanel from "../components/ActiveProjectsPanel";
import TasksActivityPanel from "../components/TasksActivityPanel";

const HomePage = () => {
    const dispatch = useDispatch();

    // get project data
    const { data, loading } = useSelector(state => state.project.userRelatedProjects)

    // get task data 
    const { allTask } = useSelector(state => state.task)

    // get recent Activity data
    const { recentActivity } = useSelector(state => state.dashboard.stats)

    // get aiInsight state
    const { aiInsight, insightLoading } = useSelector(state => state.dashboard)

    // Socket real-time updates
    useDashboardSocket();

    // Initial Data Fetch
    useEffect(() => {
        dispatch(fetchDashboardStats());
        if (!aiInsight && !insightLoading) {
            dispatch(fetchAIInsight());
        }
        dispatch(userRelatedProjectAction());
        dispatch(getAllTaskAction());
    }, [dispatch]);

    return (
        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-10 w-full min-h-screen font-sans transition-colors duration-200 bg-[var(--background)] text-[var(--text-primary)] pb-20 md:pb-6">

            {/* Header */}
            <div className="mb-5">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--on-surface)]">
                    Overview
                </h2>
                <p className="text-xs mt-1 font-medium text-[var(--text-secondary)]">
                    Track your engineering velocity, project health, and recent team activity.
                </p>
            </div>

            {/* AI Insight */}
            <AiInsightBanner />

            {/* Stats */}
            <StatsGrid />

            {/* Bottom Panels Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                <div className="lg:col-span-8">
                    <ActiveProjectsPanel projects={data} loading={loading} />
                </div>
                <div className="lg:col-span-4">
                    <TasksActivityPanel tasks={allTask.data} recentActivities={recentActivity} loading={allTask.loading} />
                </div>
            </div>

        </div>
    );
};

export default HomePage;