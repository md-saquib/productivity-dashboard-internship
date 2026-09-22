import React from "react";
import { X, Globe, Lock, ExternalLink, Calendar, Users, Code, CheckCircle2, Circle } from "lucide-react";
import { useSelector } from "react-redux";

export default function ProjectDetailsModal({ project, onClose, onEdit }) {
    const allTasks = useSelector((state) => state.task.allTask);
    const tasksArray = Array.isArray(allTasks) ? allTasks : allTasks?.data || [];

    // Filter tasks belonging to this project
    const projectTasks = tasksArray.filter((t) => {
        const pId = t.projectId?._id || t.projectId;
        return String(pId) === String(project._id);
    });

    const completedTasksCount = projectTasks.filter((t) => t.status === "done").length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-container-low)] p-6 shadow-2xl space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-[var(--border-subtle)]">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-[var(--on-surface)] capitalize">
                                {project.projectName}
                            </h2>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[var(--surface-container-high)] text-[var(--text-secondary)]">
                                {project.status || "Active"}
                            </span>
                        </div>
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-mono text-[var(--primary)] hover:underline mt-1"
                            >
                                <ExternalLink size={12} />
                                {project.repoUrl}
                            </a>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                onClose();
                                onEdit(project);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface-container-high)] hover:bg-[var(--surface-container-highest)] text-[var(--on-surface)] transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-[var(--outline)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container-high)] transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Meta details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-container)]">
                        <p className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">Owner</p>
                        <p className="text-xs font-bold text-[var(--on-surface)] mt-1 truncate">
                            {project.userId?.fullName || "You"}
                        </p>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-container)]">
                        <p className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">Visibility</p>
                        <p className="text-xs font-bold text-[var(--on-surface)] mt-1 capitalize flex items-center gap-1">
                            {project.visibility === "private" ? <Lock size={12} /> : <Globe size={12} />}
                            {project.visibility || "Public"}
                        </p>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-container)]">
                        <p className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">Progress</p>
                        <p className="text-xs font-bold text-[var(--on-surface)] mt-1">
                            {project.progress ?? 0}%
                        </p>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-container)]">
                        <p className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">Tasks</p>
                        <p className="text-xs font-bold text-[var(--on-surface)] mt-1">
                            {completedTasksCount}/{projectTasks.length} Done
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1.5 text-[var(--text-secondary)]">
                        <span>Project Completion</span>
                        <span className="text-[var(--on-surface)] font-bold">{project.progress ?? 0}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden bg-[var(--surface-container-highest)]">
                        <div
                            className="h-full rounded-full transition-all duration-300 bg-[var(--primary)]"
                            style={{ width: `${project.progress ?? 0}%` }}
                        />
                    </div>
                </div>

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase mb-2">
                            Technologies & Tools
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-md text-xs font-mono border bg-[var(--surface-container)] border-[var(--border-subtle)] text-[var(--on-surface)]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Team Leads */}
                {project.teamLeads?.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase mb-2">Team Leads</p>
                        <div className="flex flex-wrap gap-2">
                            {project.teamLeads.map((lead, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--surface-container-high)] text-[var(--on-surface)]"
                                >
                                    <Users size={12} />
                                    {lead}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Linked Tasks List */}
                <div className="border-t border-[var(--border-subtle)] pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                        Project Tasks ({projectTasks.length})
                    </h4>

                    {projectTasks.length === 0 ? (
                        <p className="text-xs text-[var(--text-secondary)] italic py-2">
                            No tasks created for this project yet. Use "New Task" in the top bar to assign tasks to this project.
                        </p>
                    ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {projectTasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-container)] flex items-center justify-between gap-3 text-xs"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        {task.status === "done" ? (
                                            <CheckCircle2 size={15} className="text-green-500 shrink-0" />
                                        ) : (
                                            <Circle size={15} className="text-[var(--outline)] shrink-0" />
                                        )}
                                        <span className={`truncate font-medium ${task.status === "done" ? "line-through text-[var(--text-secondary)]" : "text-[var(--on-surface)]"}`}>
                                            {task.title}
                                        </span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 bg-[var(--surface-container-high)] text-[var(--text-secondary)]">
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-3 border-t border-[var(--border-subtle)]">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--surface-container-high)] text-[var(--on-surface)] hover:bg-[var(--surface-container-highest)] transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
