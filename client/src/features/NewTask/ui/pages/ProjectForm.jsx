import React, { useState } from 'react'
import { ErrorMsg, Field, FormFooter } from '../components/reusable-sub-components';
import { Globe, Icon, Link2, Lock, X, PlayCircle, Clock, CircleDot, PauseCircle, CheckCircle2 } from 'lucide-react';
import { addTechTag, projectForm } from '../../hooks/customHook';
import { createProjectAction, userRelatedProjectAction } from '../../../user_Module/Projects/state/projectAction';
import { useDispatch } from 'react-redux';

const ProjectForm = ({ onClose }) => {

    const dispatch = useDispatch()

    const { registerProject, handleProjectSubmit, watchProject, setProjectValue, resetProject, projectErrors } = projectForm();

    const selectedVisibility = watchProject("visibility");
    const selectedStatus = watchProject("status");
    const techStackTags = watchProject("techStack");
    const [tagInput, setTagInput] = useState("");



    const onProjectSubmit = async (data) => {
        await dispatch(createProjectAction(data));

        await dispatch(userRelatedProjectAction());
        resetProject();
        onClose?.();
    };



    return (

        <form onSubmit={handleProjectSubmit(onProjectSubmit)} className="flex flex-col h-full">
            <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">

                {/* Project Name */}
                <Field label="PROJECT NAME">
                    <input
                        type="text"
                        placeholder="e.g., Nexus API Gateway"
                        {...registerProject("projectName", { required: "Project name is required" })}
                        className="input-base"
                    />
                    {projectErrors.projectName && <ErrorMsg>{projectErrors.projectName.message}</ErrorMsg>}
                </Field>

                {/* Repository URL */}
                <Field label="REPOSITORY URL">
                    <div className="flex items-center rounded-lg border overflow-hidden bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] focus-within:border-[var(--primary)]">
                        <span className="px-3 py-2.5 border-r border-[var(--border-subtle)] text-[var(--outline)] bg-[var(--surface-container)] shrink-0">
                            <Link2 size={14} />
                        </span>
                        <input
                            type="text"
                            placeholder="https://github.com/org/repo"
                            {...registerProject("repoUrl", { required: "Repository URL is required" })}
                            className="w-full px-3 py-2 bg-transparent text-xs outline-none font-mono text-[var(--on-surface)] placeholder:text-[var(--outline)] min-h-[44px]"
                        />
                    </div>
                    {projectErrors.repoUrl && <ErrorMsg>{projectErrors.repoUrl.message}</ErrorMsg>}
                </Field>

                {/* Visibility & Tech Stack */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="VISIBILITY">
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: "Public", Icon: Globe },
                                { value: "Private", Icon: Lock },
                            ].map(({ value, Icon }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setProjectValue("visibility", value)}
                                    className={`flex flex-col items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-semibold border transition-all min-h-[56px] ${selectedVisibility === value
                                        ? "border-[var(--primary)] bg-[rgba(192,193,255,0.08)] text-[var(--on-surface)]"
                                        : "border-[var(--border-subtle)] bg-[var(--surface-container-lowest)] text-[var(--text-secondary)]"
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span>{value}</span>
                                </button>
                            ))}
                        </div>
                    </Field>


                    <Field label="TECH STACK">
                        <div className="flex items-center flex-wrap gap-1.5 p-2 rounded-lg border bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] min-h-[56px]">
                            {techStackTags?.map((tag) => (
                                <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium font-mono border bg-[var(--surface-container-high)] border-[var(--border-subtle)] text-[var(--on-surface)]">
                                    {tag}
                                    <button type="button" onClick={() => removeTechTag(tag)} className="hover:text-[var(--error)]">
                                        <X size={10} />
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => addTechTag(e, tagInput, techStackTags, setProjectValue, setTagInput)}
                                placeholder="Add tag..."
                                className="bg-transparent border-none outline-none text-xs flex-1 min-w-[70px] text-[var(--on-surface)] placeholder:text-[var(--outline)] font-mono"
                            />
                        </div>
                    </Field>

                </div>


                <div className="grid grid-cols-1  gap-4">

                    <Field label="STATES">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {[
                                { value: "Not Started", Icon: CircleDot },
                                { value: "Active", Icon: PlayCircle },
                                { value: "Pending", Icon: Clock },
                                { value: "On Hold", Icon: PauseCircle },
                                { value: "Completed", Icon: CheckCircle2 },
                            ].map(({ value, Icon }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setProjectValue("status", value)}
                                    className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-lg text-xs font-semibold border transition-all min-h-[56px] ${selectedStatus === value
                                        ? "border-[var(--primary)] bg-[rgba(192,193,255,0.08)] text-[var(--on-surface)]"
                                        : "border-[var(--border-subtle)] bg-[var(--surface-container-lowest)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span className="truncate">{value}</span>
                                </button>
                            ))}
                        </div>
                    </Field>
                </div>

                {/* Team Leads */}
                <Field label="TEAM LEADS">
                    <input
                        type="text"
                        placeholder="Search team members..."
                        {...registerProject("teamLeads")}
                        className="input-base"
                    />
                </Field>
            </div>

            {/* Sticky Footer */}
            <FormFooter onClose={onClose} submitLabel="Launch Project" />
        </form>
    )
}

export default ProjectForm