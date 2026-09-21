import { ChevronDown, Cloud, Plus, Rocket } from "lucide-react";


export const FormFooter = ({ onClose, submitLabel }) => (
    <div className="
        sticky bottom-0 shrink-0
        flex items-center justify-between
        px-5 sm:px-6 py-4
        border-t border-[var(--border-subtle)]
        bg-[var(--surface-container-low)]
    ">
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--outline)]">
            <Cloud size={14} />
            <span className="hidden sm:block">Drafts are saved automatically.</span>
            <span className="sm:hidden">Auto-saved</span>
        </div>
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold hover:opacity-80 transition-opacity text-[var(--on-surface)] min-h-[44px]"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-[0.98] min-h-[44px] bg-[var(--primary-container)] text-[var(--on-primary-container)]"
            >
                <Rocket size={14} />
                <span>{submitLabel}</span>
            </button>
        </div>
    </div>
);

export const SelectWrapper = ({ children }) => (
    <div className="relative">
        {children}
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--outline)]" />
    </div>
);

export const ErrorMsg = ({ children }) => (
    <span className="text-[10px] text-[var(--error)]">{children}</span>
);

export const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--outline)]">
            {label}
        </label>
        {children}
    </div>
);

export const IsActive = () => (
    <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--primary)]" />
);

export const NewTaskButton = ({ setIsModalOpen, title, role }) => (
    <div className='flex justify-center lg:justify-start lg:px-4'>
        <button
            onClick={() => {
                if (role === 'user') setIsModalOpen(true)
            }}
            title='New Task'
            className='flex items-center justify-center gap-1.5 w-9 h-9 lg:w-auto lg:h-auto lg:px-4 lg:py-2 rounded-lg text-sm font-semibold bg-[var(--primary-container)] text-[var(--on-primary-container)] transition-all hover:opacity-90 active:scale-[0.97] min-h-[36px]' >
            {role === 'user' && <Plus size={16} />}
            <span className='hidden lg:inline'>{title}</span>
        </button>
    </div >
)