import AllProjects from "../../features/admin_Module/all_project/ui/pages/AllProjects";
import AllUsers from "../../features/admin_Module/all_user/ui/pages/AllUsers";



export const adminRoutes = [
    {
        path: 'projects',
        element: <AllProjects />
    },
    {
        path: 'users',
        element: <AllUsers />
    },


]