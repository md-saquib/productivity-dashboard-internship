import { ClipboardList, FolderKanban, X } from 'lucide-react'
import React from 'react'
import { IsActive } from '../components/reusable-sub-components'

const TaskHeader = ({ setActiveTab, onClose, activeTab }) => {


    return (
        <div className="flex items-center justify-between px-5 pt-5 border-b border-[var(--border-subtle)] shrink-0">
            <div className="flex items-center gap-5 text-xs font-semibold">

                {/* Create Task Tab */}
                <button
                    type="button"
                    onClick={() => setActiveTab("task")}
                    className={`flex items-center gap-2 pb-4 relative min-h-[44px] transition-colors ${activeTab === "task"
                        ? "text-[var(--on-surface)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--on-surface)]"
                        }`}
                >
                    <ClipboardList size={15} />
                    <span>Create Task</span>
                    {activeTab === "task" && <IsActive />}
                </button>

                {/* Create Project Tab */}
                <button
                    type="button"
                    onClick={() => setActiveTab("project")}
                    className={`flex items-center gap-2 pb-4 relative min-h-[44px] transition-colors ${activeTab === "project"
                        ? "text-[var(--on-surface)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--on-surface)]"
                        }`}
                >
                    <FolderKanban size={15} />
                    <span>Create Project</span>
                    {activeTab === "project" && <IsActive />}
                </button>
            </div>

            {/* Close */}
            <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--surface-container-high)] transition-colors text-[var(--outline)] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
                <X size={18} />
            </button>
        </div>
    )
}

export default TaskHeader