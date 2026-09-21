import React, { useState } from "react";
import {  filteredTasks, handleReset, statusMeta, taskFilterOption } from "../../hooks/useTaskFilter";
import FilterBar from "../../../../filter/ui/pages/FilterBar";
import { useSelector } from "react-redux";
import { TaskStatusColumn } from "../components/TaskStatusColumn";


export default function Task() {
    const { data } = useSelector(state => state.task.allTask)
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [selectedPriority, setSelectedPriority] = useState("ALL");

    const hasActiveFilters =
        search !== "" || selectedStatus !== "ALL" || selectedPriority !== "ALL";

    // Map tasks to ensure MongoDB documents match expected filter/column statuses


    const visibleTasks = filteredTasks(data, selectedStatus, selectedPriority, search);


    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans pb-20 md:pb-6">
            {/* Header */}
            <div className="mb-5">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--on-surface)]">
                    Tasks
                </h2>
                <p className="text-xs mt-1 font-medium text-[var(--text-secondary)]">
                    Manage and track engineering deliverables.
                </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search title, category, project, or ID..."
                hasActiveFilters={hasActiveFilters}
                onReset={() => handleReset(setSearch, setSelectedStatus, setSelectedPriority)}
                filters={taskFilterOption(
                    selectedStatus,
                    setSelectedStatus,
                    selectedPriority,
                    setSelectedPriority
                )}
            />

            {/* ── Desktop: 4-column grid ── */}
            <div className=" lg:grid grid-cols-4 gap-4 items-start">
                {["todo", "in-progress", "review", "done"].map((colStatus) => (
                    <TaskStatusColumn
                        key={colStatus}
                        tasks={visibleTasks.filter((t) => t.status === colStatus)}
                        meta={statusMeta[colStatus] || { label: colStatus, accent: "var(--outline)" }}
                    />
                ))}
            </div>


        </div>
    );
}
