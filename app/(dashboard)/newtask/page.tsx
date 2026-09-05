"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import Card from "@/components/Card";
import TaskDetails from "@/components/TaskDetails";
import TaskDescription from "@/components/TaskDescription";
import AssigTimeAndUser from "@/components/AssigTimeAndUser";

import { Priority, type Label } from "@/types/cardTypes";
import type { TaskStatus, TaskUser } from "@/types/task";

import { createTask } from "@/libs/api/tasks";

export default function AddTask() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [priority, setPriority] = useState<Priority>("Low");
  const [selectedTag, setSelectedTag] = useState<Label | undefined>();
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<TaskUser | undefined>();
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTaskSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    if (!assignee) {
      setError("Please select an assignee");
      return;
    }

    try {
      setIsSubmitting(true);

      await createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        flag: selectedTag,
        status,
        assignee: assignee._id,
        dueDate: dueDate || undefined,
      });

      // Task created successfully
      router.push("/");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create task"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-50 p-5 font-sans text-slate-900">
      <div className="mx-auto grid h-full min-h-0 max-w-6xl grid-cols-1 gap-5 bg-slate-50 p-3 lg:grid-cols-3">

        {/* Form */}
        <form
          onSubmit={handleTaskSubmission}
          className="flex min-h-0 flex-col overflow-hidden rounded-md bg-white p-4 lg:col-span-2"
        >
          {/* Form Content */}
          <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto">

            <TaskDetails
              title={title}
              setTitle={setTitle}
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />

            <TaskDescription
              description={description}
              setDescription={setDescription}
            />

            <AssigTimeAndUser
              dueDate={dueDate}
              setDueDate={setDueDate}
              assignee={assignee}
              setAssignee={setAssignee}
            />

            {error && (
              <p
                role="alert"
                className="text-sm text-red-500"
              >
                {error}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex shrink-0 items-center justify-between pt-5">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-400"
              >
                Save as Draft
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating..." : "Create Card"}
              </button>
            </div>
          </div>
        </form>

        {/* Preview */}
        <div className="flex min-h-0 flex-col gap-5">
          <div className="rounded-xl border border-slate-200 bg-white p-4">

            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <LayoutDashboard
                  size={14}
                  className="text-indigo-500"
                />
                LIVE KANBAN CARD PREVIEW
              </div>

              <span className="text-[10px] text-slate-400">
                Interactive
              </span>
            </div>

            <p className="mb-3 text-[11px] text-slate-400">
              This reflects the physical appearance in the To Do list.
            </p>

            <Card
              id={1}
              title={title}
              flag={selectedTag}
              description={description}
              priority={priority}
              assignee={assignee}
              dueDate={dueDate ? new Date(dueDate) : null}
            />

          </div>
        </div>

      </div>
    </div>
  );
}