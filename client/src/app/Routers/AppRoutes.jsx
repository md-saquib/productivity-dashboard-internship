import { createBrowserRouter, RouterProvider } from 'react-router'
import PublicRoute from '../protectedRoutes/PublicRoute'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../../features/auth/ui/pages/Login'
import Register from '../../features/auth/ui/pages/Register'
import ProtectedRoute from '../protectedRoutes/ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userRoutes } from './UserRoutes'
import RoleBasedRoute from './RoleBasedRoute'
import { hydrateUser } from '../../features/auth/state/authAction'
import { adminRoutes } from './AdminRoutes'
import HomePage from '../../features/Dashboard/ui/pages/HomePage'
import { getAllProjectAction, userRelatedProjectAction } from '../../features/user_Module/Projects/state/projectAction'
import { getAllTaskAction } from '../../features/user_Module/tasks/state/taskAction'


const AppRoutes = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(hydrateUser())
        dispatch(userRelatedProjectAction())
        dispatch(getAllTaskAction())
        JSON.parse(localStorage.getItem('mode')) === 'light' ? window.document.body.classList.add('light') : '';

    }, [])

    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const userRole = user?.role;

    const router = createBrowserRouter([
        {
            path: '/',
            element: <PublicRoute />,
            children: [
                {
                    path: '',
                    element: <AuthLayout />,
                    children: [
                        {
                            path: '',
                            element: <Login />
                        },
                        {
                            path: 'register',
                            element: <Register />
                        }

                    ]
                }
            ]
        },
        {
            path: '/home',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '',
                    element: <DashboardLayout />,
                    children: [
                        {
                            path: '',
                            element: <HomePage />
                        },
                        {
                            element: <RoleBasedRoute allowedRole={'user'} userRole={userRole} isAuthenticated={isAuthenticated} />,
                            children: [...userRoutes]
                        },
                        {
                            element: <RoleBasedRoute allowedRole={'admin'} userRole={userRole} isAuthenticated={isAuthenticated} />,
                            children: [...adminRoutes]
                        }
                    ]
                }
            ]
        }
    ])



    return <RouterProvider router={router} />

}

export default AppRoutes