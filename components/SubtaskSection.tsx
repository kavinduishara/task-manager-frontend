"use client";

import { Check, LoaderCircle, Pencil, Plus, Trash2, X } from "lucide-react";
import Section from "./Section";
import type { Subtask } from "@/types/task";
import { createSubtask, deleteSubtask, updateSubtask } from "@/libs/api/tasks";
import { useState } from "react";

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
  const [isAdding, setIsAdding] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const confirmNewSubtask = async () => {
    const task = newSubtask.trim();
    if (!canManageSubtasks || !task) return;

    try {
      setIsSaving(true);
      if (taskId) {
        const updatedTask = await createSubtask(taskId, { task });
        setSubtasks(updatedTask.subtasks ?? []);
      } else {
        setSubtasks([...subtasks, { task, checked: false }]);
      }
      setNewSubtask("");
      setIsAdding(false);
    } catch (error) {
      console.error("Adding subtask failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingText(subtasks[index].task ?? "");
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingText("");
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
    const task = editingText.trim();
    if (!task || !canManageSubtasks) return;

    try {
      setIsSaving(true);
      if (taskId && subtask?._id) {
        const updatedTask = await updateSubtask(taskId, subtask._id, { task });
        setSubtasks(updatedTask.subtasks ?? []);
      } else {
        setSubtasks(
          subtasks.map((item, itemIndex) =>
            itemIndex === index ? { ...item, task } : item
          )
        );
      }
      cancelEditing();
    } catch (error) {
      console.error("Updating subtask failed:", error);
    } finally {
      setIsSaving(false);
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
                {editingIndex === index ? (
                  <input
                    autoFocus
                    type="text"
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") saveSubtaskText(index);
                      if (event.key === "Escape") cancelEditing();
                    }}
                    disabled={isSaving}
                    aria-label={`Edit subtask ${index + 1}`}
                    className="min-w-0 flex-1 rounded-md bg-slate-50 px-2 py-1 text-sm text-slate-700 outline-none ring-2 ring-indigo-200"
                  />
                ) : (
                  <p className={`min-w-0 flex-1 px-1 py-1 text-sm ${subtask.checked ? "text-slate-400 line-through" : "text-slate-700"}`}>
                    {subtask.task}
                  </p>
                )}
                {editingIndex === index ? (
                  <>
                    <button type="button" onClick={() => saveSubtaskText(index)} disabled={isSaving || !editingText.trim()} aria-label={`Save subtask ${index + 1}`} className="rounded-md p-1.5 text-emerald-600 transition-colors hover:bg-emerald-50 disabled:opacity-40">
                      {isSaving ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />}
                    </button>
                    <button type="button" onClick={cancelEditing} disabled={isSaving} aria-label="Cancel editing subtask" className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => startEditing(index)} disabled={!canManageSubtasks} aria-label={`Edit subtask ${index + 1}`} className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40">
                    <Pencil size={15} />
                  </button>
                )}
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

        {isAdding ? (
          <div className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50/50 p-2">
            <input autoFocus type="text" value={newSubtask} onChange={(event) => setNewSubtask(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") confirmNewSubtask(); if (event.key === "Escape") { setIsAdding(false); setNewSubtask(""); } }} placeholder="Write one subtask..." disabled={isSaving} className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-slate-400" />
            <button type="button" onClick={confirmNewSubtask} disabled={isSaving || !newSubtask.trim()} aria-label="Confirm new subtask" className="rounded-md bg-indigo-600 p-2 text-white transition hover:bg-indigo-700 disabled:opacity-50">
              {isSaving ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />}
            </button>
            <button type="button" onClick={() => { setIsAdding(false); setNewSubtask(""); }} disabled={isSaving} aria-label="Cancel adding subtask" className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100">
              <X size={16} />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setIsAdding(true)} disabled={!canManageSubtasks} className="flex items-center gap-2 rounded-lg border border-dashed border-indigo-300 px-3 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50">
            <Plus size={16} /> Add subtask
          </button>
        )}

        {!canEditSubtasks && !isViewMode && (
          <p className="text-xs text-slate-500">
            Only the task creator, assignee, or an administrator can manage subtasks.
          </p>
        )}
      </div>
    </Section>
  );
}
