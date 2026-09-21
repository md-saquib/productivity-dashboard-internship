import React from 'react'
import { Navigate, Outlet } from 'react-router'

const RoleBasedRoute = ({ allowedRole, userRole, isAuthenticated }) => {

    if (!isAuthenticated) return <Navigate to='/' replace />

    if (!allowedRole.includes(userRole)) return <Navigate to='/unauthorized' replace />

    return <Outlet />
}

export default RoleBasedRoute