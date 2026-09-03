'use client'
import { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import Card from "@/components/Card";
import TaskDetails from "@/components/TaskDetails";
import TaskDescription from "@/components/TaskDescription";
import AssigTimeAndUser from "@/components/AssigTimeAndUser";
import type { Label } from "@/types/cardTypes";


export default function AddTask() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [selectedTag, setSelectedTag] = useState<Label | undefined>();
  const [description, setDescription] = useState("");
  const [lead, setLead] = useState("");
  const [dueDate, setDueDate] = useState("2025-04-18");


  return (
    <div className="h-[calc(100vh-4rem)]  w-full overflow-hidden bg-slate-50 p-5 font-sans text-slate-900">
      <div className="mx-auto grid h-full bg-slate-50 min-h-0 max-w-6xl grid-cols-1 gap-5 p-3 lg:grid-cols-3">
        <div className="flex min-h-0 bg-white p-4 rounded-md flex-col gap-5 overflow-y-auto lg:col-span-2">
            
            <div className="flex min-h-0 flex-col gap-5 overflow-y-auto lg:col-span-2">
                <TaskDetails title={title} setTitle={setTitle} status={status} setStatus={setStatus} priority={priority} setPriority={setPriority} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
                <TaskDescription description={description} setDescription={setDescription} />
                <AssigTimeAndUser dueDate={dueDate} setDueDate={setDueDate} />
            </div>

          <div className="flex items-center justify-between">
                <button className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200">
                    Cancel
                </button>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200">
                Save as Draft
              </button>
              <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 flex items-center gap-1.5">
                 Create Card
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <LayoutDashboard size={14} className="text-indigo-500" />
                LIVE KANBAN CARD PREVIEW
              </div>
              <span className="text-[10px] text-slate-400">Interactive</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              This reflects the physical appearance in the To Do list.
            </p>
            <Card
              id={1}
              title={title}
              label={selectedTag}
              description={description}
              assignee={lead ? { name: lead, profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(lead)}&background=random` } : undefined}
              dueDate={dueDate ? new Date(dueDate) : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
