import React from "react";
import {
    FolderKanban,
    CheckCircle2,
    MessageSquareCode,
    TrendingUp,
    Check,
    MoreHorizontal,
    CheckCheck,
    Circle,
    Hourglass,
    Filter,
    ArrowUpDown,
} from "lucide-react";

/**
 * HomePage — Overview Dashboard
 *
 * Responsive highlights:
 * - Stats row: 2-col on mobile/tablet → 4-col on desktop (grid-cols-2 lg:grid-cols-4)
 * - Bottom panels: stacked on mobile → 12-col grid on desktop
 * - pb-20 md:pb-6 for mobile bottom nav clearance
 */
const HomePage = () => {
    const statCards = [
        {
            title: "Active Projects",
            value: "12",
            change: "+2 this week",
            changeColor: "var(--secondary)",
            icon: FolderKanban,
        },
        {
            title: "Tasks Completed",
            value: "124",
            change: "+12%",
            changeColor: "var(--secondary)",
            icon: CheckCircle2,
        },
        {
            title: "Pending Reviews",
            value: "5",
            change: "Needs attention",
            changeColor: "var(--outline)",
            icon: MessageSquareCode,
        },
        {
            title: "Weekly Productivity",
            value: "87%",
            icon: TrendingUp,
        },
    ];

    const activeProjects = [
        {
            title: "API Gateway Redesign",
            updated: "Updated 2h ago",
            tags: ["GO", "GRPC"],
            progress: 75,
            progressColor: "var(--secondary)",
            statusIcon: "check",
        },
        {
            title: "Mobile App CI/CD",
            updated: "Updated 1d ago",
            tags: ["REACT NATIVE", "ACTIONS"],
            progress: 38,
            progressColor: "var(--tertiary)",
            statusIcon: "dots",
        },
        {
            title: "Documentation V2",
            updated: "Completed",
            tags: ["MDX", "NEXT.JS"],
            completed: true,
            statusIcon: "double-check",
        },
    ];

    const priorityTasks = [
        {
            id: 1,
            title: "Debug Auth Flow",
            description: "Investigate token refresh failing o...",
            type: "circle",
            badges: [
                { label: "High Priority", bg: "var(--error-container)",        color: "var(--error)"          },
                { label: "API",           bg: "var(--surface-container-high)", color: "var(--text-secondary)" },
            ],
        },
        {
            id: 2,
            title: "Refactor UI Components",
            description: "Migrate legacy buttons to new desig...",
            type: "hourglass",
            iconColor: "var(--tertiary)",
            badges: [
                { label: "In Progress", bg: "var(--tertiary-container)",     color: "var(--on-tertiary-container)" },
                { label: "Frontend",    bg: "var(--surface-container-high)", color: "var(--text-secondary)"        },
            ],
        },
        {
            id: 3,
            title: "Update dependencies",
            description: "Bump React version across monorepo.",
            type: "circle",
            badges: [
                { label: "Chore", bg: "var(--surface-container-high)", color: "var(--text-secondary)" },
            ],
        },
    ];

    return (
        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-10 w-full min-h-screen font-sans transition-colors duration-200 bg-[var(--background)] text-[var(--text-primary)] pb-20 md:pb-6">

            {/* 1. Header */}
            <div className="mb-5">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--on-surface)]">
                    Overview
                </h2>
                <p className="text-xs mt-1 font-medium text-[var(--text-secondary)]">
                    Track your engineering velocity and project health.
                </p>
            </div>

            {/* 2. Stats Grid — 2×2 on mobile/tablet, 4-col on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={i}
                            className="rounded-xl border p-4 sm:p-5 flex flex-col justify-between bg-[var(--surface-container-low)] border-[var(--border-subtle)]"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] sm:text-xs font-medium text-[var(--text-secondary)] leading-snug">
                                    {stat.title}
                                </span>
                                <Icon size={15} className="text-[var(--outline)] shrink-0" />
                            </div>

                            <div className="flex items-baseline gap-2 mt-3">
                                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--on-surface)]">
                                    {stat.value}
                                </span>
                                {stat.change && (
                                    <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--secondary)] leading-snug">
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. Bottom Panels Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">

                {/* Left: Active Projects Panel */}
                <div className="lg:col-span-8 rounded-xl border p-4 sm:p-6 flex flex-col gap-5 bg-[var(--surface-container-low)] border-[var(--border-subtle)]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold tracking-tight text-[var(--on-surface)]">
                            Active Projects
                        </h3>
                        <button className="text-xs font-semibold hover:opacity-80 transition-opacity text-[var(--primary)]">
                            View All
                        </button>
                    </div>

                    {/* Project Cards — 1 col on mobile, 2 col on sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {activeProjects.map((project, idx) => (
                            <div
                                key={idx}
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
                </div>

                {/* Right: Priority Tasks Panel */}
                <div className="lg:col-span-4 rounded-xl border p-4 sm:p-6 flex flex-col gap-4 bg-[var(--surface-container-low)] border-[var(--border-subtle)]">
                    <div className="flex items-center justify-between pb-1">
                        <h3 className="text-sm font-bold tracking-tight text-[var(--on-surface)]">
                            Priority Tasks
                        </h3>
                        <div className="flex items-center gap-2 text-[var(--outline)]">
                            <button className="hover:opacity-80 transition-opacity p-1 min-h-[44px] min-w-[44px] flex items-center justify-center">
                                <Filter size={13} />
                            </button>
                            <button className="hover:opacity-80 transition-opacity p-1 min-h-[44px] min-w-[44px] flex items-center justify-center">
                                <ArrowUpDown size={13} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col divide-y divide-[var(--border-subtle)]">
                        {priorityTasks.map((task) => (
                            <div key={task.id} className="py-3.5 flex items-start gap-3">
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;