import { useMemo } from "react";


export const filteredTasks = (data, selectedStatus, selectedPriority, search) => {
    return useMemo(() =>
        data.filter((task) => {
            const matchesSearch =
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                task._id.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                selectedStatus === "ALL" || task.status === selectedStatus;

            const matchesPriority =
                selectedPriority === "ALL" || task.priority.toUpperCase() === selectedPriority;

            return matchesSearch && matchesStatus && matchesPriority;
        }, [selectedStatus, selectedPriority, search]));
};

export const handleReset = (setSearch, setSelectedStatus, setSelectedPriority) => {
    setSearch("");
    setSelectedStatus("ALL");
    setSelectedPriority("ALL");
};

export const columns = ['change status', "todo", "in-progress", "review", "done"];

export const statusMeta = {
    todo: { label: "To-Do", accent: "var(--outline)" },
    "in-progress": { label: "In Progress", accent: "var(--tertiary)" },
    review: { label: "Review", accent: "var(--secondary)" },
    done: { label: "Done", accent: "var(--primary)" },
};

export const priorityStyles = {
    HIGH: "bg-[var(--error-container)] text-[var(--error)]",
    MEDIUM: "bg-[var(--tertiary-container)] text-[var(--on-tertiary-container)]",
    LOW: "bg-[var(--surface-container-high)] text-[var(--text-secondary)]",
};



export const taskFilterOption = (selectedStatus, setSelectedStatus, selectedPriority, setSelectedPriority) =>
    [
        {
            key: "status",
            value: selectedStatus,
            onChange: setSelectedStatus,
            options: [
                { label: "All Statuses", value: "ALL" },
                { label: "To-Do", value: "todo" },
                { label: "In Progress", value: "in-progress" },
                { label: "Review", value: "review" },
                { label: "Done", value: "done" },
            ],
        },
        {
            key: "priority",
            value: selectedPriority,
            onChange: setSelectedPriority,
            options: [
                { label: "All Priorities", value: "ALL" },
                { label: "High", value: "HIGH" },
                { label: "Medium", value: "MEDIUM" },
                { label: "Low", value: "LOW" },
            ],
        },
    ]