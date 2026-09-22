import React, { useState } from "react";
import { X, Globe, Lock, PlayCircle, Clock, CircleDot, PauseCircle, CheckCircle2 } from "lucide-react";

export default function UpdateProjectModal({ project, onClose, onUpdate }) {
    const [projectName, setProjectName] = useState(project.projectName || "");
    const [repoUrl, setRepoUrl] = useState(project.repoUrl || "");
    const [visibility, setVisibility] = useState(project.visibility || "public");
    const [status, setStatus] = useState(project.status || "Active");
    const [progress, setProgress] = useState(project.progress ?? 0);
    const [teamLeads, setTeamLeads] = useState(
        Array.isArray(project.teamLeads) ? project.teamLeads.join(", ") : project.teamLeads || ""
    );
    const [techStack, setTechStack] = useState(
        Array.isArray(project.techStack) ? project.techStack.join(", ") : project.techStack || ""
    );
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const techArray = techStack
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        const leadsArray = teamLeads
            .split(",")
            .map((l) => l.trim())
            .filter(Boolean);

        await onUpdate({
            projectId: project._id,
            projectName,
            repoUrl,
            visibility: visibility.toLowerCase(),
            status,
            progress: Number(progress),
            teamLeads: leadsArray,
            techStack: techArray.length > 0 ? techArray : ["General"],
        });

        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-container-low)] p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                    <div>
                        <h3 className="text-base font-bold text-[var(--on-surface)]">Edit Project</h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">Update project details and progress</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-[var(--outline)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container-high)] transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {/* Project Name */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                            Project Name
                        </label>
                        <input
                            type="text"
                            required
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)] focus:border-[var(--primary)] outline-none"
                        />
                    </div>

                    {/* Repo URL */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                            Repository URL
                        </label>
                        <input
                            type="url"
                            required
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)] font-mono focus:border-[var(--primary)] outline-none"
                        />
                    </div>

                    {/* Status & Visibility */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-lg border bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)] outline-none"
                            >
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Completed">Completed</option>
                                <option value="Not Started">Not Started</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                                Visibility
                            </label>
                            <select
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-lg border bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)] outline-none"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>

                    {/* Progress Slider */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                                Progress: {progress}%
                            </label>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                            className="w-full accent-[var(--primary)] cursor-pointer"
                        />
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                            Tech Stack (comma separated)
                        </label>
                        <input
                            type="text"
                            placeholder="REACT, NODE, MONGODB"
                            value={techStack}
                            onChange={(e) => setTechStack(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)] focus:border-[var(--primary)] outline-none"
                        />
                    </div>

                    {/* Team Leads */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                            Team Leads (comma separated)
                        </label>
                        <input
                            type="text"
                            placeholder="Alex M., Sarah K."
                            value={teamLeads}
                            onChange={(e) => setTeamLeads(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)] focus:border-[var(--primary)] outline-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border-subtle)]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-container)] text-[var(--text-secondary)] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
