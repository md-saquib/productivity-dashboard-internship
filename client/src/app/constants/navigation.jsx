import { BriefcaseBusinessIcon, HomeIcon,  User, User2, Workflow } from "lucide-react";

export const userNavigation = [
    {
        path: '/home',
        icons: <HomeIcon />,
        title: 'Home'
    },
    {
        path: '/home/project',
        icons: <BriefcaseBusinessIcon />,
        title: 'Project'
    },
    {
        path: '/home/task',
        icons: <Workflow />,
        title: 'Task'
    },

    {
        path: '/home/profile',
        icons: <User />,
        title: 'Profile'
    },
    
];


export const adminNavigation = [
    {
        path: '/home',
        icons: <HomeIcon />,
        title: 'Home'
    },
    {
        path: '/home/users',
        icons: <User2 />,
        title: 'Users'
    },
    {
        path: '/home/projects',
        icons: <BriefcaseBusinessIcon />,
        title: 'Projects'
    },


];