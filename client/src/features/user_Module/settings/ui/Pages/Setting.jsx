import React, { useState } from "react";
import { Code2 } from "lucide-react";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [workspaceName, setWorkspaceName] = useState("DevFlow HQ");
  const [workspaceSlug, setWorkspaceSlug] = useState("engineering");

  const tabs = [
    "General",
    "Security",
    "Notifications",
    "Billing",
    "Integrations",
  ];

  return (
    <div className="flex-1 flex flex-col p-10 w-full min-h-screen font-sans transition-colors duration-200 bg-[var(--background)] text-[var(--text-primary)]">
      {/* Page Title & Subtitle */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--on-surface)]">
          Settings
        </h2>
        <p className="text-xs mt-1 font-medium text-[var(--text-secondary)]">
          Manage your workspace preferences and configurations.
        </p>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side Tab Navigation */}
        <div className="md:col-span-3 flex flex-col gap-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-all ${isActive
                  ? "bg-[var(--surface-container-high)] text-[var(--on-surface)]"
                  : "bg-transparent text-[var(--text-secondary)]"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Right Side Settings Panels */}
        <div className="md:col-span-9 flex flex-col gap-6 max-w-3xl">
          {/* Workspace Identity Card */}
          <div className="rounded-xl border p-6 flex flex-col gap-6 bg-[var(--surface-container-low)] border-[var(--border-subtle)]">
            {/* Card Header */}
            <div>
              <h3 className="text-base font-bold tracking-tight text-[var(--on-surface)]">
                Workspace Identity
              </h3>
              <p className="text-xs mt-1 text-[var(--text-secondary)]">
                Customize how your workspace is presented to your team.
              </p>
            </div>

            {/* Workspace Logo Section */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[var(--on-surface)]">
                Workspace Logo
              </label>

              <div className="flex items-center gap-5 mt-1">
                {/* Logo Box Preview */}
                <div className="w-20 h-20 rounded-xl border flex flex-col items-center justify-center gap-1 shrink-0 bg-[var(--surface-container)] border-[var(--border-subtle)]">
                  <Code2 size={24} className="text-[var(--secondary)]" />
                  <span className="text-[8px] font-mono tracking-tighter text-[var(--outline)]">
                    DEVFLOW
                  </span>
                </div>

                {/* Upload Meta & Controls */}
                <div className="flex flex-col gap-3">
                  <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
                    Recommended size: 256×256px. Max file size: 2MB. SVG or PNG preferred.
                  </p>

                  <div className="flex items-center gap-3">
                    <button className="px-3 py-1.5 rounded-md text-xs font-medium border transition-opacity hover:opacity-90 bg-[var(--surface-container-high)] border-[var(--border-subtle)] text-[var(--on-surface)]">
                      Upload New
                    </button>
                    <button className="text-xs font-medium hover:underline transition-all text-[var(--error)]">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Workspace Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[var(--on-surface)]">
                Workspace Name
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-xs border outline-none transition-all bg-[var(--surface-container-lowest)] border-[var(--border-subtle)] text-[var(--on-surface)]"
              />
            </div>

            {/* Workspace URL Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[var(--on-surface)]">
                Workspace URL
              </label>
              <div className="flex items-center rounded-lg border overflow-hidden bg-[var(--surface-container-lowest)] border-[var(--border-subtle)]">
                <span className="px-3.5 py-2 text-xs border-r select-none font-mono bg-[var(--surface-container)] border-[var(--border-subtle)] text-[var(--text-secondary)]">
                  devflow.io/
                </span>
                <input
                  type="text"
                  value={workspaceSlug}
                  onChange={(e) => setWorkspaceSlug(e.target.value)}
                  className="w-full px-3.5 py-2 bg-transparent text-xs outline-none font-mono text-[var(--on-surface)]"
                />
              </div>
            </div>
          </div>

          {/* Danger Zone Card */}
          <div className="rounded-xl border p-6 flex flex-col gap-4 bg-[var(--surface-container-low)] border-[var(--border-subtle)]">
            <div>
              <h3 className="text-base font-bold tracking-tight text-[var(--tertiary)]">
                Danger Zone
              </h3>
              <p className="text-xs mt-0.5 text-[var(--text-secondary)]">
                Irreversible actions for this workspace.
              </p>
            </div>

            {/* Delete Workspace Action Box */}
            <div className="p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[rgba(147,0,10,0.12)] border-[rgba(255,180,171,0.2)]">
              <div>
                <h4 className="text-xs font-bold text-[var(--on-surface)]">
                  Delete Workspace
                </h4>
                <p className="text-[11px] mt-0.5 text-[var(--text-secondary)]">
                  Permanently remove this workspace and all its data.
                </p>
              </div>

              <button className="px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:opacity-90 active:scale-[0.98] self-start sm:self-auto border-[rgba(255,180,171,0.4)] bg-[rgba(147,0,10,0.3)] text-[var(--error)]">
                Delete
              </button>
            </div>
          </div>

          {/* Save Changes Bottom Button */}
          <div className="flex justify-end pt-2">
            <button className="px-5 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-[0.98] bg-[var(--primary-container)] text-[var(--on-primary-container)]">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;