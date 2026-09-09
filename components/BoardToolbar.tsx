"use client";

import { ArrowDownUp, Search, X } from "lucide-react";
import { PRIORITIES, TAGS, type Label, type Priority } from "@/types/cardTypes";
import type { TaskUser } from "@/types/task";

export const UNASSIGNED_FILTER = "__UNASSIGNED__";

interface BoardToolbarProps {
  query: string;
  label: Label | "";
  priority: Priority | "";
  assignee: string;
  dueDateSort: "asc" | "desc" | null;
  users: TaskUser[];
  onQueryChange: (query: string) => void;
  onLabelChange: (label: Label | "") => void;
  onPriorityChange: (priority: Priority | "") => void;
  onAssigneeChange: (assignee: string) => void;
  onDueDateSortChange: () => void;
  onClear: () => void;
}

export default function BoardToolbar({
  query,
  label,
  priority,
  assignee,
  dueDateSort,
  users,
  onQueryChange,
  onLabelChange,
  onPriorityChange,
  onAssigneeChange,
  onDueDateSortChange,
  onClear,
}: BoardToolbarProps) {
  const hasFilters = Boolean(query || label || priority || assignee || dueDateSort);

  return (
    <div className="flex w-full flex-wrap items-center gap-2.5 border-b border-gray-200 bg-white px-4 py-3">
      <div className="group flex min-w-55 flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-400 shadow-sm transition-all focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-50 sm:max-w-xs">
        <Search className="h-4 w-4 shrink-0 transition-colors group-focus-within:text-indigo-500" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
        {query && (
          <button type="button" onClick={() => onQueryChange("")} className="rounded-full p-0.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700" aria-label="Clear search">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <FilterSelect label="Label" value={label} onChange={(value) => onLabelChange(value as Label | "")} options={TAGS} />
      <FilterSelect label="Priority" value={priority} onChange={(value) => onPriorityChange(value as Priority | "")} options={PRIORITIES} />
      <FilterSelect label="User" value={assignee} onChange={onAssigneeChange} options={[{ value: UNASSIGNED_FILTER, label: "Unassigned" }, ...users.map((user) => ({ value: user._id, label: user.name }))]} />

      <button
        type="button"
        onClick={onDueDateSortChange}
        className={`flex h-9 items-center gap-2 rounded-xl border px-3 text-sm font-medium shadow-sm transition-all ${dueDateSort ? "border-indigo-200 bg-indigo-50 text-indigo-700 shadow-none" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"}`}
        aria-label="Sort by due date"
      >
        <ArrowDownUp className={`h-4 w-4 ${dueDateSort ? "text-indigo-500" : "text-gray-400"}`} />
        <span>Due date</span>
        {dueDateSort && <span className="text-xs font-semibold text-indigo-500">{dueDateSort === "asc" ? "↑" : "↓"}</span>}
      </button>

      {hasFilters && (
        <button type="button" onClick={onClear} className="ml-auto flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800">
          <X className="h-4 w-4" />
          Clear
        </button>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly (string | { value: string; label: string })[];
}) {
  const isActive = Boolean(value);

  return (
    <label className={`flex h-9 items-center gap-1.5 rounded-xl border px-3 text-sm shadow-sm transition-all ${isActive ? "border-indigo-200 bg-indigo-50 text-indigo-600 shadow-none" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>
      <span className={`text-xs font-medium ${isActive ? "text-indigo-500" : "text-gray-400"}`}>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={`min-w-18 cursor-pointer bg-transparent text-sm font-semibold outline-none ${isActive ? "text-indigo-700" : "text-gray-700"}`}>
        <option value="">All</option>
        {options.map((option) => {
          const optionValue = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </label>
  );
}