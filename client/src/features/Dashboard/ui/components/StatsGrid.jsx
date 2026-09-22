import React from 'react';
import { useSelector } from 'react-redux';
import { FolderKanban, CheckCircle2, MessageSquareCode, TrendingUp } from 'lucide-react';
import { StatCardSkeleton } from './DashboardSkeletons';

const StatsGrid = () => {
    const { stats, loading } = useSelector((state) => state.dashboard);

    const statCards = [
        { title: "Active Projects", value: stats.activeProjects, change: "+2 this week", changeColor: "var(--secondary)", icon: FolderKanban },
        { title: "Tasks Completed", value: stats.tasksCompleted, change: "+12%", changeColor: "var(--secondary)", icon: CheckCircle2 },
        { title: "Pending Reviews", value: stats.pendingReviews, change: stats.pendingReviews > 0 ? "Needs attention" : "All clear", changeColor: stats.pendingReviews > 0 ? "var(--outline)" : "var(--secondary)", icon: MessageSquareCode },
        { title: "Weekly Productivity", value: `${stats.weeklyProductivity}%`, icon: TrendingUp },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
            {loading ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
                : statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="rounded-xl border p-4 sm:p-5 flex flex-col justify-between bg-[var(--surface-container-low)] border-[var(--border-subtle)]">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] sm:text-xs font-medium text-[var(--text-secondary)]">{stat.title}</span>
                                <Icon size={15} className="text-[var(--outline)] shrink-0" />
                            </div>
                            <div className="flex items-baseline gap-2 mt-3">
                                <span className="text-xl sm:text-2xl font-bold text-[var(--on-surface)]">{stat.value}</span>
                                {stat.change && (
                                    <span className="text-[10px] sm:text-[11px] font-semibold" style={{ color: stat.changeColor }}>
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
export default StatsGrid;