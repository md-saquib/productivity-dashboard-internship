import React from "react";
import { Search, ChevronDown, RotateCcw } from "lucide-react";

/**
 * FilterBar — Search input + dynamic filter dropdowns + reset button.
 *
 * Responsiveness:
 * - Search: full-width on mobile, fixed w-72 on sm+
 * - All controls: flex-wrap so they reflow on small screens
 * - All interactive elements: min-h-[44px] for mobile touch accessibility
 */
export default function FilterBar({
    searchQuery,
    onSearchChange,
    searchPlaceholder = "Search...",
    filters = [],
    onReset,
    hasActiveFilters = false,
}) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 w-full mb-5 sm:mb-6">

            {/* Search Input */}
            <div className="flex items-center gap-2.5 px-3.5 rounded-lg border w-full sm:w-72 text-xs transition-colors min-h-[44px] bg-[var(--surface-container-lowest)] border-[var(--border-subtle)]">
                <Search size={14} className="text-[var(--outline)] shrink-0" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="bg-transparent border-none outline-none w-full text-xs placeholder:text-[var(--outline)] font-sans text-[var(--on-surface)]"
                />
            </div>

            {/* Filter Dropdowns + Reset */}
            <div className="flex items-center gap-2.5 flex-wrap">
                {filters.map((filter) => {
                    const isSelected = filter.value !== "ALL";
                    return (
                        <div key={filter.key} className="relative inline-block">
                            <select
                                value={filter.value}
                                onChange={(e) => filter.onChange(e.target.value)}
                                className={` appearance-none pl-3 pr-8 rounded-lg text-xs font-medium border outline-none cursor-pointer transition-all hover:opacity-90 min-h-[44px] ${isSelected ? "bg-[var(--surface-container-high)] border-[var(--primary)] text-[var(--on-surface)]" : "bg-[var(--surface-container-low)] border-[var(--border-subtle)] text-[var(--text-secondary)]"  } `}
                            >
                                {filter.options.map((opt) => (
                                    <option
                                        key={opt.value}
                                        value={opt.value}
                                        className="bg-[var(--surface-container)] text-[var(--on-surface)]"
                                    >
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={13}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--outline)]"
                            />
                        </div>
                    );
                })}

                {/* Reset Filters Button */}
                {hasActiveFilters && (
                    <button
                        onClick={onReset}
                        className="flex items-center gap-1.5 px-3 rounded-lg text-xs font-medium transition-all hover:opacity-80 min-h-[44px] text-[var(--error)] bg-[rgba(147,0,10,0.12)]"
                    >
                        <RotateCcw size={12} />
                        <span>Reset</span>
                    </button>
                )}
            </div>
        </div>
    );
}