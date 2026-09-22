import React from 'react';

export const StatCardSkeleton = () => (
    <div className="rounded-xl border p-4 sm:p-5 flex flex-col justify-between bg-[var(--surface-container-low)] border-[var(--border-subtle)] animate-pulse">
        <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded bg-[var(--surface-container-highest)]" />
            <div className="h-4 w-4 rounded-full bg-[var(--surface-container-highest)]" />
        </div>
        <div className="mt-3 h-7 w-16 rounded bg-[var(--surface-container-highest)]" />
    </div>
);

export const InsightSkeleton = () => (
    <div className="rounded-xl border p-4 bg-[var(--surface-container-low)] border-[var(--border-subtle)] animate-pulse flex items-center gap-3 mb-5">
        <div className="h-4 w-4 rounded-full bg-[var(--surface-container-highest)] shrink-0" />
        <div className="h-3 flex-1 rounded bg-[var(--surface-container-highest)]" />
    </div>
);