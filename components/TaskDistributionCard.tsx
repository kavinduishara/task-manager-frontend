"use client";

import {
  labelColors,
  priorityStyles,
  TAGS,
  PRIORITIES,
  type Label,
  type Priority,
} from "@/types/cardTypes";
import { Task } from "@/types/task";
import { AlertTriangle } from "lucide-react";

interface TaskDistributionCardProps {
  tasks: Task[];
}

interface DistributionSectionProps<T extends string> {
  title: string;
  totalTasks: number;
  items: readonly T[];
  itemCounts: Partial<Record<T, number>>;
  colors: Record<T, string>;
}

function DistributionSection<T extends string>({
  title,
  totalTasks,
  items,
  itemCounts,
  colors,
}: DistributionSectionProps<T>) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h4>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex mb-2.5">
        {totalTasks > 0 ? (
          items.map((key) => {
            const count = itemCounts[key];
            if (!count) return null;
            const percentage = (count / totalTasks) * 100;

            return (
              <div
                key={key}
                className={`h-full bg-${colors[key]}-500`}
                style={{ width: `${percentage}%` }}
                title={`${key}: ${count} tasks (${Math.round(percentage)}%)`}
              />
            );
          })
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-600 font-medium">
        {items.map((key) => {
          const count = itemCounts[key];
          if (!count) return null;

          return (
            <span key={key} className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full bg-${colors[key]}-500`}
              />
              {key} ({count})
            </span>
          );
        })}
      </div>
    </div>
  );
}



export const TaskDistributionCard = ({ tasks }: TaskDistributionCardProps) => {
  const totalTasks = tasks.length;

  // Past due calculation
  const now = new Date();
  const pastDueCount = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate);
  }).length;



  const priorityCounts = tasks.reduce(
    (acc, task) => {
      if (task.priority in acc) {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
      }
      return acc;
    },
    { Low: 0, Med: 0, High: 0, Urgent: 0 } as Record<Priority, number>
  );

  // Aggregate counts by Label (flag)
  const labelCounts = tasks.reduce((acc, task) => {
    if (task.flag) {
      acc[task.flag] = (acc[task.flag] || 0) + 1;
    }
    return acc;
  }, {} as Partial<Record<Label, number>>);

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Task Distribution</h3>
          {pastDueCount > 0 && (
            <p className="text-xs flex items-center gap-1.5 text-red-600 font-semibold mt-0.5">
              <AlertTriangle size={15} />
              <span>
                {pastDueCount} {pastDueCount === 1 ? "task" : "tasks"} past due
              </span>
            </p>
          )}
        </div>
        <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-3 py-1.5 rounded-xl">
          {totalTasks} {totalTasks === 1 ? "Task" : "Tasks"} Allocated
        </span>
      </div>

      {/* Priority Progress Bar */}
      <DistributionSection
        title="By Priority"
        totalTasks={totalTasks}
        items={PRIORITIES}
        itemCounts={priorityCounts}
        colors={priorityStyles}
      />

      {/* Label Progress Bar */}
      <DistributionSection
        title="By Label"
        totalTasks={totalTasks}
        items={TAGS}
        itemCounts={labelCounts}
        colors={labelColors}
      />
    </div>
  );
};

export default TaskDistributionCard;