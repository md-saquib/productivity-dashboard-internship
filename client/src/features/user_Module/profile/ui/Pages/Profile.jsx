import React, { useState } from "react";
import {
  MapPin,
  GitBranch,
  GitMerge,
  GitCommit,
  CircleDot,
  Filter,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Activity", "Contributions"];

  const metrics = [
    { label: "Commits", value: "1.2k" },
    { label: "PRs Merged", value: "84" },
    { label: "Issues", value: "32" },
    { label: "Projects", value: "15" },
  ];

  const techStack = [
    "React",
    "TypeScript",
    "TailwindCSS",
    "Next.js",
    "Node.js",
    "GraphQL",
  ];

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-10 w-full min-h-screen font-sans transition-colors duration-200 bg-[var(--background)] text-[var(--text-primary)] pb-20 md:pb-6">
      {/* 1. Header Profile Banner */}
      <div className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start justify-between gap-6 relative overflow-hidden bg-[var(--surface-container-low)] border-[var(--border-subtle)]">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Avatar */}
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces"
            alt="Alex Chen"
            className="w-24 h-24 rounded-xl object-cover border border-[var(--border-subtle)]"
          />

          {/* User Details */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--on-surface)]">
              Alex Chen
            </h1>
            <p className="text-xs font-medium text-[var(--text-secondary)]">
              Senior Frontend Engineer @ DevFlow
            </p>

            {/* Location & Github Info */}
            <div className="flex items-center gap-4 text-xs mt-1 text-[var(--outline)]">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitBranch size={13} />
                <span className="font-mono text-[11px]">github.com/alexc</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 mt-3">
              <button className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-[0.98] bg-[var(--primary-container)] text-[var(--on-primary-container)]">
                Message
              </button>
              <button className="px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:opacity-80 active:scale-[0.98] bg-[var(--surface-container-high)] border-[var(--border-subtle)] text-[var(--on-surface)]">
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Available Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase self-start bg-[rgba(76,215,246,0.12)] text-[var(--secondary)] border border-[rgba(76,215,246,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]" />
          <span>AVAILABLE</span>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-8 mt-8 border-b text-xs font-semibold border-[var(--border-subtle)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 relative transition-colors ${isActive ? "text-[var(--on-surface)]" : "text-[var(--text-secondary)]"
                }`}
            >
              {tab}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--primary)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Content Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left Column (Key Metrics & Tech Stack) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Key Metrics Card */}
          <div className="rounded-xl border p-5 bg-[var(--surface-container-low)] border-[var(--border-subtle)]">
            <h3 className="text-[10px] font-bold tracking-wider uppercase mb-4 text-[var(--outline)]">
              KEY METRICS
            </h3>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-xl font-bold tracking-tight text-[var(--on-surface)]">
                    {metric.value}
                  </div>
                  <div className="text-xs mt-0.5 text-[var(--text-secondary)]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="rounded-xl border p-5 bg-[var(--surface-container-low)] border-[var(--border-subtle)]">
            <h3 className="text-[10px] font-bold tracking-wider uppercase mb-3.5 text-[var(--outline)]">
              TECH STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium border bg-[var(--surface-container)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Recent Activity Feed) */}
        <div className="lg:col-span-8 rounded-xl border p-5 flex flex-col justify-between bg-[var(--surface-container-low)] border-[var(--border-subtle)]">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
            <h3 className="text-[10px] font-bold tracking-wider uppercase text-[var(--outline)]">
              RECENT ACTIVITY
            </h3>
            <button className="p-1 hover:opacity-80 text-[var(--outline)]">
              <Filter size={14} />
            </button>
          </div>

          {/* Activity Timeline List */}
          <div className="flex flex-col divide-y divide-[var(--border-subtle)]">
            {/* Item 1: Merged PR */}
            <div className="py-4 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[rgba(192,193,255,0.12)] text-[var(--primary)]">
                <GitMerge size={14} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[var(--on-surface)]">
                    Merged pull request <span className="text-[var(--primary)]">#428</span>
                  </p>
                  <span className="text-[10px] font-medium text-[var(--outline)]">
                    2h ago
                  </span>
                </div>
                <p className="text-xs mt-1 leading-relaxed text-[var(--text-secondary)]">
                  Refactor navigation component to use shared tokens and improve accessibility.
                </p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono border bg-[var(--surface-container)] border-[var(--border-subtle)] text-[var(--outline)]">
                    core-ui
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono border bg-[rgba(76,215,246,0.1)] border-[rgba(76,215,246,0.2)] text-[var(--secondary)]">
                    feature
                  </span>
                </div>
              </div>
            </div>

            {/* Item 2: Pushed Commits */}
            <div className="py-4 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[rgba(76,215,246,0.12)] text-[var(--secondary)]">
                <GitCommit size={14} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[var(--on-surface)]">
                    Pushed 3 commits to{" "}
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--surface-container-high)] text-[var(--on-surface)]">
                      main
                    </span>
                  </p>
                  <span className="text-[10px] font-medium text-[var(--outline)]">
                    5h ago
                  </span>
                </div>

                {/* Commit Box Log */}
                <div className="mt-2.5 p-3 rounded-lg border flex flex-col gap-1.5 font-mono text-[11px] bg-[var(--code-bg)] border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">a1b2c3d</span>
                    <span className="text-[var(--text-secondary)]">Update dependency versions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">f4e5d6c</span>
                    <span className="text-[var(--text-secondary)]">Fix hydration mismatch in dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">7g8h9i0</span>
                    <span className="text-[var(--text-secondary)]">Add dark mode toggle test</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3: Opened Issue */}
            <div className="py-4 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[rgba(255,183,131,0.12)] text-[var(--tertiary)]">
                <CircleDot size={14} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[var(--on-surface)]">
                    Opened issue <span className="text-[var(--tertiary)]">#1042</span>
                  </p>
                  <span className="text-[10px] font-medium text-[var(--outline)]">
                    1d ago
                  </span>
                </div>
                <p className="text-xs mt-1 leading-relaxed text-[var(--text-secondary)]">
                  Layout shift during initial load on slow connections in the analytics view.
                </p>
              </div>
            </div>
          </div>

          {/* Footer View All Activity Button */}
          <div className="pt-4 mt-2 border-t flex justify-center border-[var(--border-subtle)]">
            <button className="text-xs font-semibold transition-opacity hover:opacity-80 text-[var(--text-secondary)]">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;