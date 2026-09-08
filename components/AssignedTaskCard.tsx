"use client";

import { Task } from "@/types/task";
import {
  labelColors,
  priorityStyles,
} from "@/types/cardTypes";
import { Clock } from "lucide-react";
import formatRelativeTime from "@/libs/util/formatRelativeTime";


interface AssignedTaskCardProps {
  task: Task;
}

export const AssignedTaskCard = ({ task }: AssignedTaskCardProps) => {
  const currentFlag = task.flag || "feature";
  return (
    <div className="bg-gray-50/80 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow transition-shadow mb-3">
      <div className="flex flex-col gap-1.5">
        {/* Badges */}
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${labelColors[currentFlag]}`}
          >
            {currentFlag}
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${priorityStyles[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-bold text-gray-900 text-sm">{task.title}</h4>

        {/* Footer Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          {task.dueDate && <span className="flex"><Clock size={16}/> Due {formatRelativeTime(new Date(task.dueDate))}</span>}
        </div>
      </div>

      {/* Status Badge */}
      <span className="bg-white px-3 py-1 rounded-lg border border-gray-200 text-xs font-bold text-indigo-600 shadow-2xs">
        {task.status || "In Progress"}
      </span>
    </div>
  );
};