import React, { useState } from "react";
import { Box } from "lucide-react";
import FilterBar from "../../../../filter/ui/pages/FilterBar";
import { filteredProjects, handleReset, projectFilterOption, statusColors } from "../../hooks/useProjectFilter";
import { useSelector } from "react-redux";

export default function Project() {

    const { data } = useSelector((state) => state.project.userRelatedProjects)
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [selectedTag, setSelectedTag] = useState("ALL");

    const hasActiveFilters = search !== "" || selectedStatus !== "ALL" || selectedTag !== "ALL";

    const projects = filteredProjects(data, search, selectedTag, selectedStatus);



    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-[var(--background)] text-[var(--text-primary)] pb-20 md:pb-6">
            {/* Page Header */}
            <div className="mb-5">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--on-surface)]">
                    Active Projects
                </h2>
                <p className="text-xs mt-1 font-medium text-[var(--text-secondary)]">
                    Manage and track your active repositories and deployment status.
                </p>
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
                        // Uses visibility (public/private) or status
                        const displayStatus = project.visibility || project.status || "public";
                        const sc = statusColors?.[displayStatus] ?? {
                            bg: "var(--surface-container-high)",
                            text: "var(--text-secondary)",
                        };

                        return (
                            <div
                                key={project._id}
                                className="rounded-xl border p-5 flex flex-col justify-between gap-4 bg-[var(--surface-container-low)] border-[var(--border-subtle)] hover:border-[var(--outline)] transition-colors cursor-pointer"
                            >
                                {/* Top Row: title + status badge */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold text-[var(--on-surface)] leading-snug truncate capitalize">
                                            {project.projectName}
                                        </h3>
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[11px] font-mono mt-1 text-[var(--outline)] truncate block hover:underline hover:text-[var(--primary)]"
                                        >
                                            {project.repoUrl ? project.repoUrl.replace("https://github.com/", "") : "No repository"}
                                        </a>
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
                                <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                                    <span>
                                        Owner:{" "}
                                        <strong className="text-[var(--on-surface)] font-medium">
                                            {project.userId?.fullName || "Unknown"}
                                        </strong>
                                    </span>
                                    {project.teamLeads?.length > 0 && (
                                        <span>Lead: {project.teamLeads.join(", ")}</span>
                                    )}
                                </div>

                                {/* Progress bar (renders only if defined) */}
                                {typeof project.progress === "number" && (
                                    <div>
                                        <div className="flex items-center justify-between text-[10px] font-semibold mb-1.5">
                                            <span className="text-[var(--text-secondary)]">Progress</span>
                                            <span className="text-[var(--on-surface)]">{project.progress}%</span>
                                        </div>
                                        <div className="w-full h-1 rounded-full overflow-hidden bg-[var(--surface-container-highest)]">
                                            <div
                                                className="h-full rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${project.progress}%`,
                                                    backgroundColor: project.progressColor || "var(--primary)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Tech Stack Tags row */}
                                <div className="flex flex-wrap gap-1.5">
                                    {(project.techStack || []).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 rounded text-[10px] border bg-[var(--surface-container)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}