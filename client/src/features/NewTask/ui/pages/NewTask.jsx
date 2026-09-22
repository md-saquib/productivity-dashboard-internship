import React, { useState } from "react";
import TaskForm from "./TaskForm";
import ProjectForm from "./ProjectForm";
import TaskHeader from "./TaskHeader";


export default function NewTask({ isOpen = true, onClose }) {

    const [activeTab, setActiveTab] = useState("task"); // 'task' | 'project'

    if (!isOpen) return null;

    return (

        <div className="fixed  inset-0 z-50 flex items-center justify-center max-md:items-end p-4 max-md:p-0 bg-black/60 backdrop-blur-sm ">
            <div className="
                relative w-full max-w-2xl
                flex flex-col
                border shadow-2xl font-sans transition-colors duration-200
                bg-[var(--surface-container-low)] border-[var(--border-subtle)] text-[var(--text-primary)]
                rounded-2xl overflow-hidden
                max-md:fixed max-md:inset-0 max-md:rounded-none max-md:border-0
                max-md:shadow-none
            ">
                {/* ── Tab Header ── */}
                <TaskHeader setActiveTab={setActiveTab} onClose={onClose} activeTab={activeTab} />

                {/* ── Scrollable Form Body ── */}
                <div className="flex-1 overflow-y-auto">

                    {/* ── CREATE TASK FORM ── */}
                    {activeTab === "task" && (
                        <TaskForm onClose={onClose} />
                    )}

                    {/* ── CREATE PROJECT FORM ── */}
                    {activeTab === "project" && (
                        <ProjectForm onClose={onClose} />
                    )}
                </div>
            </div>
        </div>
    );
}
