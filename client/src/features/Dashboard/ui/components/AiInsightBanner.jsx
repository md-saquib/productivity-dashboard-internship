import React from 'react';
import { useSelector } from 'react-redux';
import { Sparkles } from 'lucide-react';
import { InsightSkeleton } from './DashboardSkeletons';

const AiInsightBanner = () => {
    const { aiInsight, insightLoading } = useSelector((state) => state.dashboard);

    if (insightLoading) return <InsightSkeleton />;
    if (!aiInsight) return null;

    return (
        <div className="rounded-xl border p-3.5 sm:p-4 bg-[var(--surface-container-low)] border-[var(--border-subtle)] flex items-start gap-3 mb-5">
            <Sparkles size={15} className="text-[var(--primary)] shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-[var(--on-surface)] leading-relaxed">
                <span className="text-[var(--primary)] font-semibold mr-1">AI Insight:</span>
                {aiInsight}
            </p>
        </div>
    );
};
export default AiInsightBanner;