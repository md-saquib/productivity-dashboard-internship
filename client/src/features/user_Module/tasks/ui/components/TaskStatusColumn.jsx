
import { TaskCard } from "./TaskCard";


export function TaskStatusColumn({ tasks, meta }) {
    return (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-container-low)] p-4 flex flex-col gap-3 min-h-[350px]">
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                    <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: meta.accent }}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                        {meta.label}
                    </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--surface-container-high)] text-[var(--text-secondary)]">
                    {tasks.length}
                </span>
            </div>

            {/* Task Cards */}
            <div className="flex flex-col gap-2.5">
                {tasks.length === 0 ? (
                    <p className="text-[11px] text-[var(--outline)] text-center mt-8 italic">
                        No tasks here
                    </p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))
                )}
            </div>
        </div>
    );
}