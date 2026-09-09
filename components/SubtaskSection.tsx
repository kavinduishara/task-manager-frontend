"use client";

import { Plus, Trash2 } from "lucide-react";
import Section from "./Section";
import type { Subtask } from "@/types/task";
import { deleteSubtask, updateSubtask } from "@/libs/api/tasks";

interface SubtaskSectionProps {
  subtasks: Subtask[];
  setSubtasks: (subtasks: Subtask[]) => void;
  taskId?: string;
  isViewMode: boolean;
  canEditSubtasks: boolean;
}

export default function SubtaskSection({
  subtasks,
  setSubtasks,
  taskId,
  isViewMode,
  canEditSubtasks,
}: SubtaskSectionProps) {
  const canManageSubtasks = !isViewMode && canEditSubtasks;

  const addSubtask = () => {
    if (!canManageSubtasks) return;

    setSubtasks([...subtasks, { task: "", checked: false }]);
  };

  const updateSubtaskText = (index: number, task: string) => {
    setSubtasks(
      subtasks.map((subtask, subtaskIndex) =>
        subtaskIndex === index ? { ...subtask, task } : subtask
      )
    );
  };

  const toggleSubtask = async (index: number) => {
    if (!canManageSubtasks) return;

    const subtask = subtasks[index];
    const checked = !subtask.checked;
    setSubtasks(
      subtasks.map((subtask, subtaskIndex) =>
        subtaskIndex === index
          ? { ...subtask, checked }
          : subtask
      )
    );

    if (taskId && subtask._id) {
      const updatedTask = await updateSubtask(taskId, subtask._id, { checked });
      setSubtasks(updatedTask.subtasks ?? []);
    }
  };

  const removeSubtask = async (index: number) => {
    if (!canManageSubtasks) return;

    const subtask = subtasks[index];
    if (taskId && subtask._id) {
      const updatedTask = await deleteSubtask(taskId, subtask._id);
      setSubtasks(updatedTask.subtasks ?? []);
      return;
    }
    setSubtasks(subtasks.filter((_, subtaskIndex) => subtaskIndex !== index));
  };

  const saveSubtaskText = async (index: number) => {
    const subtask = subtasks[index];
    if (taskId && subtask?._id && subtask.task.trim()) {
      const updatedTask = await updateSubtask(taskId, subtask._id, {
        task: subtask.task.trim(),
      });
      setSubtasks(updatedTask.subtasks ?? []);
    }
  };

  return (
    <Section number={4} title="Subtasks">
      <div className="space-y-3">
        {subtasks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 px-3 py-4 text-sm text-slate-500">
            No subtasks added yet.
          </p>
        ) : (
          <div className="space-y-2">
            {subtasks.map((subtask, index) => (
              <div
                key={`subtask-${index}`}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2"
              >
                <input
                  type="checkbox"
                  checked={Boolean(subtask.checked)}
                  onChange={() => toggleSubtask(index)}
                  disabled={!canManageSubtasks}
                  aria-label={`Mark subtask ${index + 1} as complete`}
                  className="h-4 w-4 shrink-0 accent-indigo-600"
                />
                <input
                  type="text"
                  value={subtask.task ?? ""}
                  onChange={(event) => updateSubtaskText(index, event.target.value)}
                  onBlur={() => saveSubtaskText(index)}
                  disabled={!canManageSubtasks}
                  placeholder="Enter a subtask"
                  aria-label={`Subtask ${index + 1}`}
                  className={`min-w-0 flex-1 bg-transparent px-1 py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400 ${
                    subtask.checked ? "text-slate-400 line-through" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => removeSubtask(index)}
                  disabled={!canManageSubtasks}
                  aria-label={`Remove subtask ${index + 1}`}
                  className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addSubtask}
          disabled={!canManageSubtasks}
          className="flex items-center gap-2 rounded-lg border border-dashed border-indigo-300 px-3 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={16} />
          Add subtask
        </button>

        {!canEditSubtasks && !isViewMode && (
          <p className="text-xs text-slate-500">
            Only the task creator, assignee, or an administrator can manage subtasks.
          </p>
        )}
      </div>
    </Section>
  );
}
