import Profile from "../../features/user_Module/profile/ui/Pages/Profile";
import Project from "../../features/user_Module/Projects/ui/Pages/Project";
import Task from "../../features/user_Module/tasks/ui/Pages/Task";


export const userRoutes = [
    {
        path: 'project',
        element: <Project />
    },
    {
        path: 'task',
        element: <Task />
    },
    {
        path: 'profile',
        element: <Profile />
    },


]