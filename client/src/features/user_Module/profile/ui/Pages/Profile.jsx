import React from 'react'
import { useSelector } from 'react-redux'


function Profile() {

  const { fullName, email, department, role, id } = useSelector(state => state.auth.user);g

  const formatText = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const initial = fullName.charAt(0).toUpperCase();

  return (

    <div className=" group w-full h-full  bg-[var(--surface-container)] p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary-fixed-dim)] hover:shadow-xl">

      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">

        {/* Left Section: Avatar & Info */}
        <div className="flex w-full flex-1 items-center gap-5 border-b border-[var(--border-subtle)] pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">

          {/* Avatar with Status Indicator */}
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)] text-2xl font-bold text-[var(--on-primary)] shadow-md transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20 md:rounded-[1.25rem] md:text-3xl">
            {initial}
            <span className="absolute -bottom-1.5 -right-1.5 block h-4 w-4 rounded-full border-2 border-[var(--surface-container)] bg-green-500 md:h-5 md:w-5"></span>
          </div>

          {/* Name & Email */}
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-[var(--on-surface)] md:text-2xl">
              {formatText(fullName)}
            </h2>
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--on-surface-variant)]">
              {/* Mail Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="truncate">{email}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Badges & ID */}
        <div className="flex w-full shrink-0 flex-col gap-5 md:w-auto">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <div className="flex items-center gap-1.5 rounded-full bg-[var(--tertiary-container)] py-1.5 pl-2.5 pr-3.5 shadow-sm">
              {/* Briefcase Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--on-tertiary-container)]">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--on-tertiary-container)]">
                {formatText(department)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-[var(--secondary-container)] py-1.5 pl-2.5 pr-3.5 shadow-sm">
              {/* Shield Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--on-secondary-container)]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--on-secondary-container)]">
                {formatText(role)}
              </span>
            </div>
          </div>

          {/* System ID with Copy Action layout */}
          <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--code-bg)] px-3 py-2 transition-colors hover:border-[var(--outline-variant)]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--on-surface-variant)]">
                ID
              </span>
              <code className="text-xs font-medium text-[var(--on-surface)]">
                {id}
              </code>
            </div>
            {/* Copy Button Placeholder */}
            <button
              className="text-[var(--outline)] transition-colors hover:text-[var(--primary)]"
              title="Copy ID"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Profile