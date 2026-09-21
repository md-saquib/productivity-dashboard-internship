import React from 'react'
import { NavLink } from 'react-router'


const NavItem = ({ value }) => {
    return (
        <NavLink
            end={true}
            to={`${value.path}`}
            title={value.title}
            className={({ isActive }) =>
                `
                relative group flex items-center gap-3 px-0 lg:px-5 py-2.5 w-full text-sm font-medium transition-colors duration-150 justify-center lg:justify-start min-h-[44px]
                ${isActive
                    ? 'text-[var(--on-surface)] bg-[var(--surface-container-high)] border-r-2 border-[var(--primary)] lg:border-r-4'
                    : 'text-[var(--text-secondary)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container)]'
                }
                `
            }
        >
            {/* Icon — always rendered */}
            <span className='shrink-0 [&>svg]:w-[18px] [&>svg]:h-[18px]'>
                {value.icons}
            </span>

            {/* Label — hidden on tablet, shown on desktop */}
            <span className='hidden lg:block truncate'>{value.title}</span>

            {/* Tooltip for tablet (md only, when lg is not active) */}
            <span className=' pointer-events-none absolute left-full ml-3 z-50 hidden md:group-hover:block lg:hidden px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap bg-[var(--surface-container-highest)] text-[var(--on-surface)] border border-[var(--border-subtle)] shadow-lg'>
                {value.title}
            </span>
        </NavLink>
    )
}

export default NavItem