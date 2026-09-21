import { Plus } from "lucide-react"
import { NavLink } from "react-router"

/** Individual mobile nav tab */
export const MobileNavItem = ({ item }) => {
    const Icon = item.icons
    return (
        <NavLink
            end={true}
            to={item.path}
            title={item.title}
            className={({ isActive }) => `
                flex flex-col items-center justify-center
                gap-0.5
                w-14 h-full
                text-[10px] font-semibold
                transition-colors duration-150
                min-h-[44px]
                ${isActive
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--outline)] hover:text-[var(--on-surface)]'
                }
            `}
        >
            {({ isActive }) => (
                <>
                    <span className={`
                        flex items-center justify-center w-10 h-6 rounded-full
                        transition-all duration-150
                        ${isActive ? 'bg-[var(--surface-container-high)]' : ''}
                    `}>
                        <span className='shrink-0 [&>svg]:w-[18px] [&>svg]:h-[18px]'>
                            {item.icons}
                        </span>

                    </span>
                    <span>{item.title}</span>
                </>
            )}
        </NavLink>
    )
}


{/* Center FAB — "New Entry" */ }

export const NewEntryButton = ({ setIsModalOpen }) => (<button
    onClick={() => setIsModalOpen(true)}
    title='New Entry'
    className='  relative -top-4  flex flex-col items-center justify-center  w-14 h-14 rounded-full shrink-0 bg-[var(--primary-container)] text-[var(--on-primary-container)]  shadow-lg shadow-[var(--primary-container)]/40   border-4 border-[var(--surface)]       active:scale-95 transition-transform    '
>
    <Plus size={22} strokeWidth={2.5} />
</button>)