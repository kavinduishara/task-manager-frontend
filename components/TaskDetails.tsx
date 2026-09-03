import React from 'react'
import Section from './Section'
import { STATUSES, TAGS, type Label } from '@/types/cardTypes';

function TaskDetails({title, setTitle, status, setStatus, priority, setPriority, selectedTag, setSelectedTag}: {title: string; setTitle: (title: string) => void; status: string; setStatus: (status: string) => void; priority: string; setPriority: (priority: string) => void; selectedTag: Label | undefined; setSelectedTag: (tag: Label) => void}) {
  return (
    <Section number={1} title="Task Details">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Implement OAuth 2.0 authentication flow"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Initial Status / Column
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Priority Rating
                  </label>
                  <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs font-medium">
                    {["Low", "Med", "High", "Urgent"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2.5 transition-colors ${
                          priority === p
                            ? "bg-indigo-50 text-indigo-700 shadow-inner"
                            : "bg-white text-slate-500 hover:bg-slate-50"
                        } ${p !== "Low" ? "border-l border-slate-200" : ""}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Tags & Classification
                </label>
                <div className="flex flex-wrap gap-4">
                  {TAGS.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="tag"
                        value={tag}
                        checked={selectedTag === tag}
                        onChange={() => setSelectedTag(tag)}
                        className="h-4 w-4 accent-indigo-600"
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Section>
  )
}

export default TaskDetails
