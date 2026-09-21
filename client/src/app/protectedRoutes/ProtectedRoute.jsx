import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {

    const { user, isLoading } = useSelector(state => state.auth);

    if (!user) return <Navigate to='/' />

    if (isLoading) return <div className='text-[4rem] w-full h-[100vh] bg-[var(--background)] flex justify-center items-center'> Loading State.....</div>



    return <Outlet />
}

export default ProtectedRoute