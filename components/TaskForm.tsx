"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import Card from "@/components/Card";
import TaskDetails from "@/components/TaskDetails";
import TaskDescription from "@/components/TaskDescription";
import AssigTimeAndUser from "@/components/AssigTimeAndUser";

import { Priority, type Label } from "@/types/cardTypes";
import type { TaskStatus, TaskUser } from "@/types/task";

import {
  createTask,
  getTask,
  updateTask,
} from "@/libs/api/tasks";
import { useNotification } from "./providers/NotificationProvider";
import axios from "axios";
import { useUserDetails } from "./providers/UserDetailsProvider";
import PageLoader from "@/components/PageLoader";

export default function TaskForm({
  taskId,
}: {
  taskId?: string;
}) {
  const router = useRouter();
  const { showNotification } = useNotification();
  const { user }=useUserDetails()
  
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [priority, setPriority] = useState<Priority>("Low");
  const [selectedTag, setSelectedTag] = useState<Label | undefined>();
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<TaskUser | null | undefined>();
  const [creator, setCreator] = useState<TaskUser | null>(null);
  const [dueDate, setDueDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const isEditMode = Boolean(taskId);
  const [isViewMode, setIsViewMode] = useState(isEditMode);
  const displayedCreator = isEditMode ? creator : user;
  const canEditTask =
    user?.role === "ADMIN" ||
    !assignee ||
    user?._id === creator?._id ||
    user?._id === assignee._id;
  const canEditDetails =
    user?.role === "ADMIN" ||
    user?._id === creator?._id ||
    user?._id === assignee?._id;
  const isDetailsReadOnly = isEditMode && (isViewMode || !canEditDetails);

  // --------------------------------
  // Fetch task when editing
  // --------------------------------
  useEffect(() => {
    if (!taskId) return;

    

    const fetchTask = async () => {
      try {
        setIsLoading(true);

        const task = await getTask(taskId);

        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
        setSelectedTag(task.flag);
        setAssignee(task.assignee);
        setCreator(task.creator)


        if (task.dueDate) {
          setDueDate(task.dueDate.split("T")[0]);
        } else {
          setDueDate("");
        }
      } catch (error) {
        console.error("Fetching task failed:", "error");

        showNotification("Failed to load task","error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  // --------------------------------
  // Submit
  // --------------------------------
  const handleTaskSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();


    if (!title.trim()) {
      showNotification("Title is required","error");
      return;
    }

    if (!description.trim()) {
      showNotification("Description is required","error");
      return;
    }

    if (!selectedTag) {
      showNotification("Please select a tag","error");
      return;
    }

    try {
      setIsSubmitting(true);

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        priority,
        flag: selectedTag,
        status,
        ...(assignee ? { assignee: assignee._id } : {}),
        dueDate: dueDate || undefined,
      };

      if (isEditMode) {
        await updateTask(taskId!, taskData);
      } else {
        await createTask(taskData);
      }
      showNotification("task updated","success")

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Saving task failed:", error);

      if (axios.isAxiosError(error)) {
          showNotification(
          error.response?.data?.message ??
          "Failed to update task status.","error"
          );
      } else {
          showNotification("Failed to update task status.","error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------
  // Cancel
  // --------------------------------
  const handleCancel = () => {
    router.back();
  };

  // --------------------------------
  // Loading
  // --------------------------------
  if (isLoading) {
    return <PageLoader label="Loading task..." />;
  }

  // --------------------------------
  // UI
  // --------------------------------
  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-50 p-5 font-sans text-slate-900">
      <div className="mx-auto grid h-full min-h-0 max-w-6xl grid-cols-1 gap-5 bg-slate-50 p-3 lg:grid-cols-3">

        {/* Form */}
        <form
          onSubmit={isViewMode ? undefined : handleTaskSubmission}
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
              isViewMode={isDetailsReadOnly}
            />

            <TaskDescription
              description={description}
              setDescription={setDescription}
              isViewMode={isDetailsReadOnly}
            />

            <AssigTimeAndUser
              dueDate={dueDate}
              setDueDate={setDueDate}
              assignee={assignee}
              setAssignee={setAssignee}
              creator={displayedCreator}
              currentUser={user}
              isViewMode={isViewMode}
              canEditDetails={!isEditMode || canEditDetails}
            />
          </div>

          {/* Form Actions */}
          <div className="flex shrink-0 items-center justify-between pt-5">

            {/* Cancel */}
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <div className="flex gap-2">


              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || isViewMode}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                    ? "Update Task"
                    : "Create Card"}
              </button>
              {isEditMode &&
              <button
                onClick={() => setIsViewMode((previous) => !previous)}
                type="button"
                disabled={
                  !canEditTask
                }
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isViewMode?"Edit": "View"}
              </button>}

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
              id={taskId ?? "preview"}
              title={title}
              flag={selectedTag}
              description={description}
              priority={priority}
              assignee={assignee}
              dueDate={
                dueDate
                  ? new Date(dueDate)
                  : null
              }
            />

          </div>
        </div>

      </div>
    </div>
  );
}