export const getProjectStatusIcon = (status, completed) => {
    if (status === "Completed" || completed) return "double-check";
    if (status === "Active") return "check";
    return "dots"; 
};

export const getProgressColor = (status) => {
    if (status === "Active") return "var(--secondary)";
    if (status === "Pending") return "var(--tertiary)";
    return "var(--outline)";
};

export const buildTaskBadges = (task) => {
    const badges = [];
    if (task.priority === "High" || task.priority === "Critical") {
        badges.push({
            label: task.priority === "Critical" ? "Critical" : "High Priority",
            bg: "var(--error-container)",
            color: "var(--error)",
        });
    }
    if (task.status === "in-progress") {
        badges.push({
            label: "In Progress",
            bg: "var(--tertiary-container)",
            color: "var(--on-tertiary-container)",
        });
    } else if (task.status === "review") {
        badges.push({
            label: "In Review",
            bg: "var(--secondary-container)",
            color: "var(--on-secondary-container)",
        });
    } else if (task.status === "todo") {
        badges.push({
            label: "Todo",
            bg: "var(--surface-container-high)",
            color: "var(--text-secondary)",
        });
    }
    if (task.category) {
        badges.push({
            label: task.category,
            bg: "var(--surface-container-high)",
            color: "var(--text-secondary)",
        });
    }
    return badges;
};

export const getTaskIconType = (task) => {
    if (task.status === "in-progress") return "hourglass";
    return "circle";
};

export const timeAgo = (dateString) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
};