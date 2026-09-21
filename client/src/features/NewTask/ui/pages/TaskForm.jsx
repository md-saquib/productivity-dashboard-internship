import React, { useEffect } from 'react'
import { ErrorMsg, Field, FormFooter, SelectWrapper } from '../components/reusable-sub-components';
import { taskForm } from '../../hooks/customHook';
import { Calendar, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAction, getAllTaskAction } from '../../../user_Module/tasks/state/taskAction';

// taskData  → pass the existing task object when editing (optional)
// onSubmit  → override the submit handler (optional, used by update flow)
const TaskForm = ({ onClose, taskData = null, onSubmit }) => {

    const { registerTask, handleTaskSubmit, watchTask, setTaskValue, resetTask, taskErrors } = taskForm();

    const selectedPriority = watchTask("priority");

    const { data } = useSelector(state => state.project.userRelatedProjects)
    const dispatch = useDispatch()

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
                setTaskValue("dueDate", new Date(taskData.dueDate).toISOString().split("T")[0]);
            }
        }
    }, [taskData]);

    const onTaskSubmit = async (data) => {
        if (onsubmit) {
            // Edit mode: delegate to the update handler provided by TaskCard
            await onsubmit(data);
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

                {/* Category & Assignees */}
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
                                {...registerTask("projectId")}
                                className="select-base"
                            >
                                {data.map(val => <option key={val._id} value={val._id}>{val.projectName}</option>)}

                            </select>
                        </SelectWrapper>
                    </Field>
                </div>

                {/* Priority & Due Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="PRIORITY">
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: "LOW", dot: "var(--primary)" },
                                { value: "MEDIUM", dot: "var(--secondary)" },
                                { value: "HIGH", dot: "var(--error)" },
                            ].map(({ value, dot }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setTaskValue("priority", value)}
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold border transition-all min-h-[44px] ${selectedPriority === value
                                        ? value === "High"
                                            ? "border-[var(--error)] bg-[rgba(255,180,171,0.08)] text-[var(--on-surface)]"
                                            : "border-[var(--primary)] bg-[rgba(192,193,255,0.08)] text-[var(--on-surface)]"
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

export default TaskForm
