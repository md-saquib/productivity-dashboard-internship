import React, { useState } from "react";
import { Box, Pencil, Trash2, Eye, ExternalLink, Plus } from "lucide-react";
import FilterBar from "../../../../filter/ui/pages/FilterBar";
import { filteredProjects, handleReset, projectFilterOption, statusColors } from "../../hooks/useProjectFilter";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectAction, deleteProjectAction, userRelatedProjectAction } from "../../state/projectAction";
import UpdateProjectModal from "../components/UpdateProjectModal";
import ProjectDetailsModal from "../components/ProjectDetailsModal";

export default function Project() {
    const dispatch = useDispatch();
    const userRelatedProjects = useSelector((state) => state.project.userRelatedProjects);
    
    // Ensure safe array unwrap
    const rawData = Array.isArray(userRelatedProjects)
        ? userRelatedProjects
        : userRelatedProjects?.data || [];

    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [selectedTag, setSelectedTag] = useState("ALL");

    // Modal states
    const [editingProject, setEditingProject] = useState(null);
    const [viewingProject, setViewingProject] = useState(null);

    const hasActiveFilters = search !== "" || selectedStatus !== "ALL" || selectedTag !== "ALL";

    const projects = filteredProjects(rawData, search, selectedTag, selectedStatus);

    const handleUpdate = async (projectData) => {
        const res = await dispatch(updateProjectAction(projectData));
        if (res.payload) {
            await dispatch(userRelatedProjectAction());
        }
    };

    const handleDelete = async (e, projectId, projectName) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete project "${projectName}"?`)) {
            const res = await dispatch(deleteProjectAction({ projectId }));
            if (res.payload) {
                await dispatch(userRelatedProjectAction());
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-[var(--background)] text-[var(--text-primary)] pb-20 md:pb-6">
            {/* Page Header */}
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--on-surface)]">
                        Active Projects
                    </h2>
                    <p className="text-xs mt-1 font-medium text-[var(--text-secondary)]">
                        Manage, track, edit, and inspect your repositories and project lifecycles.
                    </p>
                </div>
            </div>

            {/* Filter Component */}
            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search projects or repositories..."
                hasActiveFilters={hasActiveFilters}
                onReset={() => handleReset(setSearch, setSelectedTag, setSelectedStatus)}
                filters={projectFilterOption(
                    selectedStatus,
                    setSelectedStatus,
                    selectedTag,
                    setSelectedTag
                )}
            />

            {/* Projects Grid */}
            {!projects || projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-[var(--outline)]">
                    <Box size={36} strokeWidth={1.2} />
                    <p className="text-sm font-medium">No projects match your filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                    {projects.map((project) => {
                        const displayStatus = project.status || project.visibility || "Active";
                        const sc = statusColors?.[displayStatus] ?? {
                            bg: "var(--surface-container-high)",
                            text: "var(--text-secondary)",
                        };

                        return (
                            <div
                                key={project._id}
                                onClick={() => setViewingProject(project)}
                                className="rounded-xl border p-5 flex flex-col justify-between gap-4 bg-[var(--surface-container-low)] border-[var(--border-subtle)] hover:border-[var(--outline)] hover:shadow-md transition-all cursor-pointer group"
                            >
                                {/* Top Row: title + status badge */}
                                <div>
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-bold text-[var(--on-surface)] leading-snug truncate capitalize group-hover:text-[var(--primary)] transition-colors">
                                                {project.projectName}
                                            </h3>
                                            {project.repoUrl ? (
                                                <a
                                                    href={project.repoUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-[11px] font-mono mt-1 text-[var(--outline)] truncate block hover:underline hover:text-[var(--primary)]"
                                                >
                                                    {project.repoUrl.replace("https://github.com/", "")}
                                                </a>
                                            ) : (
                                                <span className="text-[11px] font-mono mt-1 text-[var(--outline)]">No repository</span>
                                            )}
                                        </div>

                                        <span
                                            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5"
                                            style={{
                                                backgroundColor: sc.bg,
                                                color: sc.text,
                                            }}
                                        >
                                            {displayStatus}
                                        </span>
                                    </div>

                                    {/* Creator & Team Leads Info */}
                                    <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] mt-3">
                                        <span>
                                            Owner:{" "}
                                            <strong className="text-[var(--on-surface)] font-medium">
                                                {project.userId?.fullName || "You"}
                                            </strong>
                                        </span>
                                        {project.teamLeads?.length > 0 && (
                                            <span className="truncate max-w-[140px]">
                                                Lead: {Array.isArray(project.teamLeads) ? project.teamLeads.join(", ") : project.teamLeads}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div>
                                    <div className="flex items-center justify-between text-[10px] font-semibold mb-1.5">
                                        <span className="text-[var(--text-secondary)]">Progress</span>
                                        <span className="text-[var(--on-surface)]">{project.progress ?? 0}%</span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full overflow-hidden bg-[var(--surface-container-highest)]">
                                        <div
                                            className="h-full rounded-full transition-all duration-300 bg-[var(--primary)]"
                                            style={{
                                                width: `${project.progress ?? 0}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Tech Stack Tags row */}
                                <div className="flex flex-wrap gap-1.5">
                                    {(project.techStack || []).slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 rounded text-[10px] border bg-[var(--surface-container)] border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {(project.techStack || []).length > 4 && (
                                        <span className="px-1.5 py-0.5 text-[9px] font-medium text-[var(--text-secondary)]">
                                            +{project.techStack.length - 4} more
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons Footer (Edit, Delete, Details) */}
                                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs mt-1">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setViewingProject(project);
                                        }}
                                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                                    >
                                        <Eye size={13} />
                                        <span>Details</span>
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingProject(project);
                                            }}
                                            className="p-1.5 rounded-md hover:bg-[var(--surface-container-high)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                                            title="Edit Project"
                                        >
                                            <Pencil size={13} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => handleDelete(e, project._id, project.projectName)}
                                            className="p-1.5 rounded-md hover:bg-[rgba(255,180,171,0.15)] text-[var(--text-secondary)] hover:text-[var(--error)] transition-colors"
                                            title="Delete Project"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Edit Project Modal */}
            {editingProject && (
                <UpdateProjectModal
                    project={editingProject}
                    onClose={() => setEditingProject(null)}
                    onUpdate={handleUpdate}
                />
            )}

            {/* View Project Details Modal */}
            {viewingProject && (
                <ProjectDetailsModal
                    project={viewingProject}
                    onClose={() => setViewingProject(null)}
                    onEdit={(p) => setEditingProject(p)}
                />
            )}
        </div>
    );
}