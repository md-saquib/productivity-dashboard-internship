import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const RoleBasedRoute = ({ allowedRole }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const userRole = user?.role;

    if (!isAuthenticated) return <Navigate to='/' replace />

    if (!allowedRole.includes(userRole)) return <Navigate to='/unauthorized' replace />

    return <Outlet />
}

export default RoleBasedRoute