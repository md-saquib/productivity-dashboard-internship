import { useState } from "react";
import { UpdateButton } from "./UpdateButton";
import { DeleteButton } from "./DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllTaskAction, updateTaskStatus, deleteTask, updateTask } from "../../state/taskAction";
import { SelectWrapper } from "../../../../NewTask/ui/components/reusable-sub-components";
import { columns, priorityStyles } from "../../hooks/useTaskFilter";
import TaskForm from "../../../../NewTask/ui/pages/TaskForm";
import TaskHeader from "../../../../NewTask/ui/pages/TaskHeader";
import UpdateTask from "./UpdateTask";



export function TaskCard({ task }) {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.task)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)

    const formattedDueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    }) : null;

    const handleChangeStatus = async (e) => {
        const res = await dispatch(updateTaskStatus({ taskId: task._id, status: e.target.value }))
        if (res.payload) await dispatch(getAllTaskAction())
    }



    const handleUpdateSubmit = async (formData) => {
        const res = await dispatch(updateTask({ ...formData, taskId: task._id }))
        if (res.payload) {
            await dispatch(getAllTaskAction())
            setIsUpdateOpen(false)
        }
    }

    const handleDelete = async (id) => {
        const res = await dispatch(deleteTask({ taskId: id }))
        if (res.payload) await dispatch(getAllTaskAction())
    }

    return (
        <>
            <div className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-container)] text-xs flex flex-col gap-2 transition-all hover:border-[var(--outline)] hover:shadow-sm cursor-pointer">
                {/* Top Bar: Project name & ID */}
                <div className="flex items-center justify-between gap-2">
                    {task.projectId?.projectName ? (
                        <span className="text-[10px] font-semibold truncate text-[var(--primary)] uppercase tracking-wide">
                            {task.projectId.projectName}
                        </span>
                    ) : (
                        <span className="text-[10px] text-[var(--outline)] font-mono">
                            #{String(task.id).slice(-6)}
                        </span>
                    )}

                    <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${priorityStyles[task.priority] || priorityStyles.LOW
                            }`}
                    >
                        {task.priority}
                    </span>
                </div>

                {/* Task Title */}
                <h3 className="font-semibold text-[var(--on-surface)] text-sm leading-snug">
                    {task.title}
                </h3>

                {/* Description Preview */}
                {task.description && (
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed whitespace-pre-line">
                        {task.description}
                    </p>
                )}

                {/* Category Tag */} {/* Change Status */}

                <div className="flex justify-between items-center">
                    {task.category && (
                        <div className="pt-1">
                            <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-[var(--surface-container-high)] text-[var(--text-secondary)] font-medium">
                                {task.category}
                            </span>
                        </div>
                    )}

                    {task.status && (
                        <SelectWrapper>
                            <select
                                onChange={handleChangeStatus}
                                className="select-base"
                            >
                                {columns.map(val => <option key={val} value={val}>{val}</option>)}

                            </select>
                        </SelectWrapper>
                    )}

                </div>
                {/* Card Footer: Due Date & Assignee */}
                <div className="flex items-center justify-between pt-2 mt-0.5 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)]">
                    {formattedDueDate ? (
                        <span className="flex items-center gap-1 font-medium">
                            📅 {formattedDueDate}
                        </span>
                    ) : (
                        <span />
                    )}

                    {task.userId?.fullName && (
                        <span className="flex items-center gap-1.5 font-medium text-[var(--on-surface)]">
                            <span className="w-4 h-4 rounded-full bg-[var(--primary-container)] text-[var(--on-primary-container)] flex items-center justify-center text-[9px] font-bold uppercase">
                                {task.userId.fullName[0]}
                            </span>
                            {task.userId.fullName}
                        </span>
                    )}
                </div>

                {/* update and delete feature */}
                <div className="flex items-center justify-between pt-2 mt-0.5 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)]">

                    <UpdateButton onClick={() => setIsUpdateOpen(true)} isLoading={loading} />
                    <DeleteButton onClick={() => handleDelete(task._id)} isLoading={loading} />


                </div>
            </div >

            {/* ── Update Task Modal ── */}
            {isUpdateOpen && <UpdateTask setIsUpdateOpen={setIsUpdateOpen} handleUpdateSubmit={handleUpdateSubmit}  task={task}/>}
        </>
    );
}
