// src/features/dashboard/ui/components/ActiveProjectsPanel.jsx
import React from "react";
import { Check, MoreHorizontal, CheckCheck } from "lucide-react";
import { getProjectStatusIcon, getProgressColor, timeAgo } from "../../utils/dashboardHelpers";

const ActiveProjectsPanel = ({ projects, loading }) => {
    // Determine array structure from Redux state
    const projectsArray = Array.isArray(projects) ? projects : projects?.data || [];

    // Filter, slice and map the data exactly like before
    const activeProjects = projectsArray
        .filter((p) => p.status !== "Completed")
        .slice(0, 6)
        .map((p) => ({
            id: p._id,
            title: p.projectName,
            updated: p.updatedAt ? `Updated ${timeAgo(p.updatedAt)}` : "Recently updated",
            tags: p.techStack || [],
            progress: p.progress ?? 0,
            progressColor: getProgressColor(p.status),
            statusIcon: getProjectStatusIcon(p.status, p.status === "Completed"),
            completed: p.status === "Completed",
        }));

    return (
        <div className="rounded-xl border p-4 sm:p-6 flex flex-col gap-5 bg-[var(--surface-container-low)] border-[var(--border-subtle)] h-full">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold tracking-tight text-[var(--on-surface)]">
                    Active Projects
                </h3>
                <span className="text-xs font-semibold text-[var(--text-secondary)]">
                    {activeProjects.length} in progress
                </span>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl border p-4 min-h-[130px] bg-[var(--surface-container)] border-[var(--border-subtle)] animate-pulse"
                        />
                    ))}
                </div>
            ) : activeProjects.length === 0 ? (
                <p className="text-xs text-[var(--text-secondary)] text-center py-8">
                    No active projects yet. Create one to get started!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {activeProjects.map((project) => (
                        <div
                            key={project.id}
                            className="rounded-xl border p-4 flex flex-col justify-between min-h-[130px] bg-[var(--surface-container)] border-[var(--border-subtle)]"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h4 className="text-xs font-bold text-[var(--on-surface)]">
                                            {project.title}
                                        </h4>
                                        <p className="text-[10px] mt-0.5 text-[var(--text-secondary)]">
                                            {project.updated}
                                        </p>
                                    </div>

                                    {project.statusIcon === "check" && (
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[var(--secondary-container)] text-[var(--on-secondary-container)]">
                                            <Check size={11} strokeWidth={3} />
                                        </div>
                                    )}
                                    {project.statusIcon === "dots" && (
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[var(--tertiary-container)] text-[var(--on-tertiary-container)]">
                                            <MoreHorizontal size={11} strokeWidth={3} />
                                        </div>
                                    )}
                                    {project.statusIcon === "double-check" && (
                                        <CheckCheck size={16} className="text-[var(--outline)] shrink-0" />
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-[var(--surface-container-high)] text-[var(--text-secondary)]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {!project.completed ? (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between text-[10px] font-semibold mb-1.5">
                                        <span className="text-[var(--text-secondary)]">Progress</span>
                                        <span className="text-[var(--on-surface)]">{project.progress}%</span>
                                    </div>
                                    <div className="w-full h-1 rounded-full overflow-hidden bg-[var(--surface-container-highest)]">
                                        <div
                                            className="h-full rounded-full transition-all duration-300"
                                            style={{
                                                width: `${project.progress}%`,
                                                backgroundColor: project.progressColor,
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-1 mt-4 rounded-full bg-[var(--surface-container-highest)]" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActiveProjectsPanel;