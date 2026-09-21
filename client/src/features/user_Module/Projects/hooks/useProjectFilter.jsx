import { useMemo } from "react";



//   Filtering Logic

export const filteredProjects = (initialProjects = [], search = "", selectedTag = "ALL", selectedStatus = "ALL") => {
    return useMemo(() => {
        const q = search?.toLowerCase().trim() || "";
        return (initialProjects || []).filter((p) => {
            const name = (p.projectName || p.title || "").toLowerCase();
            const repo = (p.repoUrl || p.repo || "").toLowerCase();
            const status = (p.visibility || p.status || "").toLowerCase();
            const tags = (p.techStack || p.tags || []).map((t) => String(t).toLowerCase());

            const matchSearch = !q || name.includes(q) || repo.includes(q) || tags.some((t) => t.includes(q));
            const matchStatus = selectedStatus === "ALL" || status === selectedStatus.toLowerCase();
            const matchTag = selectedTag === "ALL" || tags.includes(selectedTag.toLowerCase());

            return matchSearch && matchStatus && matchTag;
        });
    }, [initialProjects, search, selectedStatus, selectedTag]);
};

export const handleReset = (setSearch, setSelectedTag, setSelectedStatus) => {
    setSearch("");
    setSelectedStatus("ALL");
    setSelectedTag("ALL");
};

export const statusColors = {
    ACTIVE: { bg: "var(--secondary-container)", text: "var(--on-secondary-container)" },
    PLANNING: { bg: "var(--tertiary-container)", text: "var(--on-tertiary-container)" },
    BLOCKED: { bg: "var(--error-container)", text: "var(--error)" },
};

export const projectFilterOption = (selectedStatus, setSelectedStatus, selectedTag, setSelectedTag) =>
    [
        {
            key: "status",
            value: selectedStatus,
            onChange: setSelectedStatus,
            options: [
                { label: "All Statuses", value: "ALL" },
                { label: "Active", value: "ACTIVE" },
                { label: "Planning", value: "PLANNING" },
                { label: "Blocked", value: "BLOCKED" },
            ],
        },
        {
            key: "tag",
            value: selectedTag,
            onChange: setSelectedTag,
            options: [
                { label: "All Tech Stacks", value: "ALL" },
                { label: "React", value: "React" },
                { label: "Go", value: "Go" },
                { label: "Python", value: "Python" },
            ],
        },
    ]

