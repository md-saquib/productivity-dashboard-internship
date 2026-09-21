import React from 'react'
import NavItem from './NavItem'
import { LogOut, Plus } from 'lucide-react'
import { userNavigation, adminNavigation } from '../../../../app/constants/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { NewTaskButton } from '../../../NewTask/ui/components/reusable-sub-components'
import { logout } from '../../../auth/state/authAction'

const AsideNav = ({ setIsModalOpen }) => {
    const { role } = useSelector(state => state.auth.user)
    const dispatch = useDispatch();

    const navigation = role === 'user' ? userNavigation : adminNavigation;

    const handleLogout = async () => {

        dispatch(logout())
    }

    return (
        <>

            <aside className='hidden md:flex flex-col gap-6 h-screen bg-[var(--surface)] border-r border-[var(--border-subtle)] transition-all duration-200 w-16 lg:w-64 shrink-0 overflow-hidden'>

                <div className='w-full pt-5 flex flex-col items-center lg:items-start lg:px-5 gap-1'>
                    <span className='text-2xl font-black text-[var(--surface-tint)] leading-none'>
                        DF
                    </span>
                    <span className='hidden lg:block text-[10px] font-semibold tracking-widest uppercase text-[var(--text-secondary)] mt-0.5'>
                        Enterprise WorkSpace
                    </span>
                </div>

                {role === 'user' ? <NewTaskButton setIsModalOpen={setIsModalOpen} title={'New Task'} role={role} /> : <NewTaskButton setIsModalOpen={setIsModalOpen} title={'Admin Panel'} role={role} />}

                <nav className='flex flex-col gap-1 w-full'>
                    {navigation.filter(Boolean).map((value, i) => (
                        <NavItem key={i} value={value} collapsed={true} />
                    ))}
                </nav>

                {/* Logout — bottom of sidebar */}
                <div className='mt-auto mb-6 flex items-center justify-center lg:justify-start lg:px-5 gap-3 cursor-pointer group'
                    onClick={() => handleLogout()}>
                    <LogOut
                        size={18}
                        className='text-[var(--outline)] group-hover:text-[var(--error)] transition-colors shrink-0'
                    />
                    <span className='hidden lg:block text-sm font-semibold text-[var(--outline)] group-hover:text-[var(--error)] transition-colors'>
                        Logout
                    </span>
                </div>
            </aside>
        </>
    )
}

export default AsideNav