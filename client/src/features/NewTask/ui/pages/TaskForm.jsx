import React, { useEffect, useState } from 'react'
import { ErrorMsg, Field, FormFooter, SelectWrapper } from '../components/reusable-sub-components';
import { taskForm } from '../../hooks/customHook';
import { Calendar, Sparkles, Loader2, Wand2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAction, getAllTaskAction } from '../../../user_Module/tasks/state/taskAction';
import { axiosInstance } from '../../../../app/config/axiosInstance';

// taskData  → pass the existing task object when editing (optional)
// onSubmit  → override the submit handler (optional, used by update flow)
const TaskForm = ({ onClose, taskData = null, onSubmit }) => {

    const { registerTask, handleTaskSubmit, watchTask, setTaskValue, resetTask, taskErrors } = taskForm();

    const selectedPriority = watchTask("priority");

    const userProjects = useSelector(state => state.project.userRelatedProjects);
    const projectsList = Array.isArray(userProjects) ? userProjects : userProjects?.data || [];
    
    const dispatch = useDispatch();

    // AI task generator state
    const [aiPrompt, setAiPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [showAiInput, setShowAiInput] = useState(false);

    // Pre-fill form fields when editing an existing task
    useEffect(() => {
        if (taskData) {
            setTaskValue("title", taskData.title || "");
            setTaskValue("description", taskData.description || "");
            setTaskValue("category", taskData.category || "Frontend Development");
            setTaskValue("projectId", taskData.projectId?._id || taskData.projectId || "");
            setTaskValue("priority", taskData.priority || "LOW");
            // Format date to YYYY-MM-DD for the date input
            if (taskData.dueDate) {
                try {
                    setTaskValue("dueDate", new Date(taskData.dueDate).toISOString().split("T")[0]);
                } catch (e) {
                    setTaskValue("dueDate", taskData.dueDate);
                }
            }
        }
    }, [taskData, setTaskValue]);

    const handleAIGenerate = async () => {
        if (!aiPrompt.trim()) return;
        setIsGenerating(true);
        try {
            const res = await axiosInstance.post('/api/dashboard/ai-generate-task', { prompt: aiPrompt });
            if (res.data?.success && res.data?.data) {
                const { title, description, category, priority } = res.data.data;
                if (title) setTaskValue("title", title);
                if (description) setTaskValue("description", description);
                if (category) setTaskValue("category", category);
                if (priority) setTaskValue("priority", priority.toUpperCase());
                setShowAiInput(false);
                setAiPrompt("");
            }
        } catch (err) {
            console.error("AI task generation error:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    const onTaskSubmit = async (data) => {
        if (onSubmit) {
            // Edit mode: delegate to the update handler provided by TaskCard / UpdateTask
            await onSubmit(data);
        } else {
            // Create mode
            await dispatch(createTaskAction(data));
            await dispatch(getAllTaskAction());
        }
        resetTask();
        onClose?.();
    };

    return (
        <form onSubmit={handleTaskSubmit(onTaskSubmit)} className="flex flex-col h-full">
            <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">

                {/* AI Assistant Quick Generator Banner */}
                {!taskData && (
                    <div className="rounded-xl border border-[var(--primary)]/30 bg-[rgba(192,193,255,0.06)] p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)]">
                                <Sparkles size={14} />
                                AI-Assisted Task Generation
                            </span>
                            <button
                                type="button"
                                onClick={() => setShowAiInput(!showAiInput)}
                                className="text-[11px] font-semibold text-[var(--primary)] hover:underline"
                            >
                                {showAiInput ? "Close" : "✨ Auto-Fill with AI"}
                            </button>
                        </div>

                        {showAiInput && (
                            <div className="flex items-center gap-2 pt-1 animate-fade-in">
                                <input
                                    type="text"
                                    placeholder="e.g. Implement rate limiting on auth endpoints..."
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAIGenerate())}
                                    className="flex-1 px-3 py-2 text-xs rounded-lg border bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)] placeholder:text-[var(--outline)] outline-none focus:border-[var(--primary)]"
                                />
                                <button
                                    type="button"
                                    disabled={isGenerating || !aiPrompt.trim()}
                                    onClick={handleAIGenerate}
                                    className="px-3 py-2 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-50 shrink-0"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 size={13} className="animate-spin" />
                                            <span>Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 size={13} />
                                            <span>Generate</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Title */}
                <Field label="TITLE">
                    <input
                        type="text"
                        placeholder="e.g., Implement authentication middleware"
                        {...registerTask("title", { required: "Title is required" })}
                        className="input-base"
                    />
                    {taskErrors.title && <ErrorMsg>{taskErrors.title.message}</ErrorMsg>}
                </Field>

                {/* Description */}
                <Field label="DESCRIPTION">
                    <div className="rounded-lg border overflow-hidden bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] focus-within:border-[var(--primary)]">
                        <textarea
                            rows={3}
                            placeholder="Describe the requirements and acceptance criteria..."
                            {...registerTask("description")}
                            className="w-full p-3 bg-transparent text-xs outline-none resize-none text-[var(--on-surface)] placeholder:text-[var(--outline)]"
                        />
                    </div>
                </Field>

                {/* Category & Regarding Project */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="CATEGORY">
                        <SelectWrapper>
                            <select
                                {...registerTask("category")}
                                className="select-base"
                            >
                                <option>Frontend Development</option>
                                <option>Backend Development</option>
                                <option>UI/UX Design</option>
                                <option>DevOps & CI/CD</option>
                            </select>
                        </SelectWrapper>
                    </Field>

                    <Field label="REGARDING WHICH PROJECT">
                        <SelectWrapper>
                            <select
                                {...registerTask("projectId", { required: "Project is required" })}
                                className="select-base"
                            >
                                <option value="">Select a project</option>
                                {projectsList.map(val => (
                                    <option key={val._id} value={val._id}>
                                        {val.projectName}
                                    </option>
                                ))}
                            </select>
                        </SelectWrapper>
                        {taskErrors.projectId && <ErrorMsg>{taskErrors.projectId.message}</ErrorMsg>}
                    </Field>
                </div>

                {/* Priority & Due Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="PRIORITY">
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { value: "LOW", dot: "var(--primary)" },
                                { value: "MEDIUM", dot: "var(--secondary)" },
                                { value: "HIGH", dot: "var(--error)" },
                            ].map(({ value, dot }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setTaskValue("priority", value)}
                                    className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold border transition-all min-h-[44px] ${
                                        selectedPriority === value
                                            ? value === "HIGH"
                                                ? "border-[var(--error)] bg-[rgba(255,180,171,0.12)] text-[var(--on-surface)]"
                                                : "border-[var(--primary)] bg-[rgba(192,193,255,0.12)] text-[var(--on-surface)]"
                                            : "border-[var(--border-subtle)] bg-[var(--surface-container-lowest)] text-[var(--text-secondary)]"
                                    }`}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot }} />
                                    <span>{value}</span>
                                </button>
                            ))}
                        </div>
                    </Field>

                    <Field label="DUE DATE">
                        <div className="relative">
                            <input
                                type="date"
                                {...registerTask("dueDate")}
                                className="w-full px-3.5 py-2.5 rounded-lg text-xs font-medium border outline-none min-h-[44px] bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)] [color-scheme:dark]"
                            />
                            <Calendar size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--outline)]" />
                        </div>
                    </Field>
                </div>
            </div>

            {/* Sticky Footer */}
            <FormFooter onClose={onClose} submitLabel={taskData ? "Update Task" : "Launch Task"} />
        </form>
    )
}

export default TaskForm;
