"use client";

import { AssignedTaskCard } from "@/components/AssignedTaskCard";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { SprintCapacityCard } from "@/components/TaskDistributionCard";
import { Task } from "@/types/task";
import { UserDetails } from "@/types/user";
import { useState } from "react";

interface UserProfilePageProps {
  user: UserDetails;
  userTasks: Task[];
}

export default function UserProfilePage({ user, userTasks = [] }: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState("overview");


  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar */}
      <ProfileSidebar user={user} activeTasksCount={userTasks.length} />

      <div className="flex-1">


        {/* Tab Contents */}
        {activeTab === "overview" && (
          <div>
            {/* Sprint Capacity */}
            <SprintCapacityCard assignedTasksCount={userTasks.length} />

            {/* Currently Assigned Tasks Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-base">Currently Assigned Tasks</h3>
              <a href="#" className="text-indigo-600 text-xs font-bold hover:underline">
                View on Kanban →
              </a>
            </div>

            {/* Tasks List */}
            {userTasks.length > 0 ? (
              userTasks.map((task) => <AssignedTaskCard key={task._id} task={task} />)
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100 text-sm">
                No active tasks assigned to this user.
              </div>
            )}
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100 text-sm">
            Section coming soon...
          </div>
        )}
      </div>
    </div>
  );
}