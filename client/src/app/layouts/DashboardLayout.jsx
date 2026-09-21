import React, { useState } from 'react'
import { Outlet } from 'react-router'
import AsideNav from '../../features/Navbar/ui/pages/AsideNav'
import TopNav from '../../features/Navbar/ui/pages/TopNav'
import MobileBottomNav from '../../features/Navbar/ui/pages/MobileBottomNav'
import NewTask from '../../features/NewTask/ui/pages/NewTask'

const DashboardLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='flex h-screen bg-[var(--background)] overflow-hidden'>

            {/* Sidebar — hidden on mobile, icon-only on tablet, full on desktop */}
            <AsideNav setIsModalOpen={setIsModalOpen} />

            {/* Main Content Column */}
            <div className='flex flex-col flex-1 min-w-0 overflow-hidden bg-[var(--surface-container)]'>

                {/* Top Navigation Bar */}
                <TopNav setIsModalOpen={setIsModalOpen} />

                {/* New Entry Modal */}
                <NewTask isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                {/* Scrollable Page Content — pb-20 on mobile prevents content hiding behind bottom nav */}
                <div className='flex-1 overflow-y-auto pb-20 md:pb-0'>
                    <Outlet />
                </div>
            </div>

            {/* Mobile Bottom Navigation Bar — visible only on mobile */}
            {!isModalOpen && <MobileBottomNav setIsModalOpen={setIsModalOpen} />}
        </div>
    )
}

export default DashboardLayout