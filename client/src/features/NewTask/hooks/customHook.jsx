import { useForm } from "react-hook-form";

export const taskForm = () => {

    // ── Task Form ──
    const {
        register: registerTask,
        handleSubmit: handleTaskSubmit,
        watch: watchTask,
        setValue: setTaskValue,
        reset: resetTask,
        formState: { errors: taskErrors },
    } = useForm({
        defaultValues: {
            status: 'todo'
        }
    });

    return { registerTask, handleTaskSubmit, watchTask, setTaskValue, resetTask, taskErrors }

}

export const projectForm = () => {
    // ── Project Form ──
    const {
        register: registerProject,
        handleSubmit: handleProjectSubmit,
        watch: watchProject,
        setValue: setProjectValue,
        reset: resetProject,
        formState: { errors: projectErrors },
    } = useForm({
        defaultValues: {
            projectName: "",
            repoUrl: "",
            visibility: "Public",
            techStack: ["React", "Node.js"],
            teamLeads: [],
            status: 'Active'
        },
    });
    return { registerProject, handleProjectSubmit, watchProject, setProjectValue, resetProject, projectErrors };
}

export const addTechTag = (e, tagInput, techStackTags, setProjectValue, setTagInput) => {
    if (e.key === "Enter" && tagInput.trim()) {
        e.preventDefault();
        if (!techStackTags.includes(tagInput.trim()))
            setProjectValue("techStack", [...techStackTags, tagInput.trim()]);
        setTagInput("");
    }
};


export const removeTechTag = (tag, setProjectValue) => {
    setProjectValue("techStack", techStackTags.filter((t) => t !== tag));
}
