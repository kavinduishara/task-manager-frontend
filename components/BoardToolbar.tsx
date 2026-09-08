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
  return (
    <div className="flex w-full flex-wrap items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
      <div className="flex min-w-55 flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-gray-500 focus-within:border-gray-300 focus-within:bg-white sm:max-w-xs">
        <Search className="h-4 w-4 shrink-0" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search cards in board..."
          className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      <FilterSelect label="Label" value={label} onChange={(value) => onLabelChange(value as Label | "")} options={TAGS} />
      <FilterSelect label="Priority" value={priority} onChange={(value) => onPriorityChange(value as Priority | "")} options={PRIORITIES} />
      <FilterSelect
        label="User"
        value={assignee}
        onChange={onAssigneeChange}
        options={[
          { value: UNASSIGNED_FILTER, label: "Unassigned" },
          ...users.map((user) => ({ value: user._id, label: user.name })),
        ]}
      />

      <button
        type="button"
        onClick={onDueDateSortChange}
        className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors ${
          dueDateSort
            ? "border-blue-200 bg-blue-50 text-blue-700"
            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        }`}
        aria-label="Sort by due date"
      >
        <ArrowDownUp className="h-4 w-4" />
        Due date{dueDateSort === "asc" ? " (earliest)" : dueDateSort === "desc" ? " (latest)" : ""}
      </button>

      {(query || label || priority || assignee || dueDateSort) && (
        <button type="button" onClick={onClear} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800">
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
  return (
    <label className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600">
      <span className="text-gray-400">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-w-20 bg-transparent font-medium text-gray-700 outline-none">
        <option value="">All</option>
        {options.map((option) => {
          const optionValue = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;
          return <option key={optionValue} value={optionValue}>{optionLabel}</option>;
        })}
      </select>
    </label>
  );
}