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
                        element: <RoleBasedRoute allowedRole={'user'} />,
                        children: [...userRoutes]
                    },
                    {
                        element: <RoleBasedRoute allowedRole={'admin'} />,
                        children: [...adminRoutes]
                    }
                ]
            }
        ]
    }
]);

const AppRoutes = () => {
    const dispatch = useDispatch();
    console.log()


    useEffect(() => {
        dispatch(hydrateUser());
        if (JSON.parse(localStorage.getItem('mode')) === 'light') {
            window.document.body.classList.add('light');
        }
    }, [dispatch]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;