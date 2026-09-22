// src/features/dashboard/ui/components/TasksActivityPanel.jsx
import React, { useState } from "react";
import { Hourglass, Circle } from "lucide-react";
import { getTaskIconType, buildTaskBadges, timeAgo } from "../../utils/dashboardHelpers";

const TasksActivityPanel = ({ tasks, recentActivities = [], loading }) => {
    const [rightTab, setRightTab] = useState("tasks");

    // Filter, slice and map task data
    const priorityTasks = (tasks?.data || tasks || [])
        .filter((t) => t.priority === "High" || t.priority === "Critical" || t.status === "review")
        .slice(0, 5)
        .map((t) => ({
            id: t._id,
            title: t.title,
            description: t.description,
            type: getTaskIconType(t),
            badges: buildTaskBadges(t),
        }));

    return (
        <div className="rounded-xl border p-4 sm:p-6 flex flex-col gap-4 bg-[var(--surface-container-low)] border-[var(--border-subtle)] h-full">
            {/* Header Tabs */}
            <div className="flex items-center justify-between pb-1 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setRightTab("tasks")}
                        className={`text-xs font-bold tracking-tight pb-1 border-b-2 transition-all ${rightTab === "tasks"
                                ? "border-[var(--primary)] text-[var(--on-surface)]"
                                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--on-surface)]"
                            }`}
                    >
                        Priority Tasks
                    </button>
                    <button
                        type="button"
                        onClick={() => setRightTab("activity")}
                        className={`text-xs font-bold tracking-tight pb-1 border-b-2 transition-all ${rightTab === "activity"
                                ? "border-[var(--primary)] text-[var(--on-surface)]"
                                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--on-surface)]"
                            }`}
                    >
                        Recent Activity
                    </button>
                </div>
            </div>

            {rightTab === "tasks" ? (
                <div className="flex flex-col divide-y divide-[var(--border-subtle)]">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="py-3.5 animate-pulse">
                                <div className="h-3 w-3/4 rounded bg-[var(--surface-container-highest)] mb-2" />
                                <div className="h-2.5 w-1/2 rounded bg-[var(--surface-container-highest)]" />
                            </div>
                        ))
                    ) : priorityTasks.length === 0 ? (
                        <p className="text-xs text-[var(--text-secondary)] text-center py-8">
                            No priority tasks right now 🎉
                        </p>
                    ) : (
                        priorityTasks.map((task) => (
                            <div key={task.id} className="py-3 flex items-start gap-3">
                                <div className="mt-0.5 shrink-0">
                                    {task.type === "hourglass" ? (
                                        <Hourglass size={14} className="text-[var(--tertiary)]" />
                                    ) : (
                                        <Circle size={14} className="text-[var(--outline)]" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-semibold leading-tight text-[var(--on-surface)] truncate">
                                        {task.title}
                                    </h4>
                                    <p className="text-[11px] mt-0.5 truncate font-mono text-[var(--text-secondary)]">
                                        {task.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                        {task.badges.map((badge, bIdx) => (
                                            <span
                                                key={bIdx}
                                                className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                                                style={{
                                                    backgroundColor: badge.bg,
                                                    color: badge.color,
                                                }}
                                            >
                                                {badge.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="flex flex-col divide-y divide-[var(--border-subtle)]">
                    {recentActivities.length === 0 ? (
                        <p className="text-xs text-[var(--text-secondary)] text-center py-8">
                            No recent activity recorded.
                        </p>
                    ) : (
                        recentActivities.map((act, idx) => (
                            <div key={idx} className="py-3 flex items-start gap-2.5">
                                <div className="mt-1 w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="text-xs font-medium text-[var(--on-surface)] truncate">
                                            {act.title}
                                        </h4>
                                        <span className="text-[10px] text-[var(--outline)] shrink-0 font-mono">
                                            {timeAgo(act.timestamp)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-[var(--surface-container-high)] text-[var(--text-secondary)]">
                                            {act.status || act.type}
                                        </span>
                                        {act.project && (
                                            <span className="text-[10px] text-[var(--text-secondary)] truncate">
                                                📁 {act.project}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default TasksActivityPanel;