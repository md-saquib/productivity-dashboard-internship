import React from 'react'
import { Plus } from 'lucide-react'
import { MobileNavItem, NewEntryButton } from '../components/reuseableMobileView'
import { userNavigation } from '../../../../app/constants/navigation'



const MobileBottomNav = ({ setIsModalOpen }) => {

    const leftSide = userNavigation.slice(0, 2)
    const rightSide = userNavigation.slice(2)
    return (
        <nav className='
            flex md:hidden
            fixed bottom-0 left-0 right-0 z-50
            items-center justify-around
            h-16
            pb-safe
            bg-[var(--surface)]
            border-t border-[var(--border-subtle)]
            shadow-[0_-4px_24px_rgba(0,0,0,0.18)]
        '>
            {/* Left 2 items */}
            {leftSide.map((item, i) => (

                <MobileNavItem key={item.path} item={item} />
            ))}
            <NewEntryButton setIsModalOpen={setIsModalOpen}      />

            {/* right 2 items */}
            {rightSide.map((item, i) => (

                <MobileNavItem key={item.path} item={item} />
            ))}



        </nav>
    )
}



export default MobileBottomNav
