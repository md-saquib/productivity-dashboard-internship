import { Moon, Plus, Search, Sun } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../../../auth/state/themeSlice'
import { NewTaskButton } from '../../../NewTask/ui/components/reusable-sub-components';

const TopNav = ({ setIsModalOpen }) => {
    const dispatch = useDispatch();

    const handleTheme = () => {
        dispatch(changeTheme())
    }
    const { mode } = useSelector(state => state.theme)
    const { role } = useSelector(state => state.auth.user)

    return (
        <>
            {/* ── Desktop / Tablet Top Bar ── */}
            <header className='hidden md:flex w-full h-16 items-center justify-between px-5 border-b border-[var(--border-subtle)] bg-[var(--surface-bright)] shrink-0 '>
                {/* Left: New Task Button */}
                {role === 'user' && <NewTaskButton setIsModalOpen={setIsModalOpen} title={'New Entry'} role={role} />}

                {/* Right: Theme toggle */}
                <button
                    onClick={handleTheme}
                    title='Toggle theme'
                    className='flex items-center justify-centerw-11 h-11 rounded-lg text-[var(--outline)] hover:bg-[var(--surface-container-high)]transition-colors cursor-pointer' >
                    {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </header>

            {/* ── Mobile Top Bar ── */}
            <header className=' flex md:hidden w-full h-14 items-center justify-between px-4 border-b border-[var(--border-subtle)] bg-[var(--surface)] shrink-0 z-40'>
                {/* Left: Logo / Brand */}
                <div className='flex items-center gap-2'>
                    <span className='text-lg font-black text-[var(--surface-tint)] leading-none'>DF</span>
                    <span className='text-sm font-bold text-[var(--on-surface)] tracking-tight'>DevFlow HQ</span>
                </div>

                {/* Right: Search icon + theme toggle + avatar */}
                <div className='flex items-center gap-1'>


                    {/* Theme toggle */}
                    <button
                        onClick={handleTheme}
                        title='Toggle theme'
                        className='flex items-center justify-center w-10 h-10 rounded-lg text-[var(--outline)] hover:bg-[var(--surface-container-high)] transition-colors'
                    >
                        {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>


                </div>
            </header>
        </>
    )
}

export default TopNav