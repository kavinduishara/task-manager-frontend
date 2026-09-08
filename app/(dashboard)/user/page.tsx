"use client";

import { useEffect, useMemo, useState } from "react";
import { AssignedTaskCard } from "@/components/AssignedTaskCard";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import TaskDistributionCard from "@/components/TaskDistributionCard";
import { getMyDetails, getMyTasks } from "@/libs/api/users";
import { Task } from "@/types/task";
import { UserDetails } from "@/types/user";

export default function UserProfilePage() {
  const [user, setUser] = useState<UserDetails>();
  const [userTasks, setUserTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [details, tasks] = await Promise.all([
          getMyDetails(),
          getMyTasks(),
        ]);

        setUser(details.user);
        setUserTasks(tasks);
      } catch (error) {
        console.error("Fetching profile data failed:", error);
      }
    };

    fetchProfile();
  }, []);

  // Split tasks safely into completed and incomplete arrays
  const { complete, incomplete } = useMemo(() => {
    return userTasks.reduce<{ complete: Task[]; incomplete: Task[] }>(
      (acc, task) => {
        if (task.status === "DONE") {
          acc.complete.push(task);
        } else {
          acc.incomplete.push(task);
        }
        return acc;
      },
      { complete: [], incomplete: [] }
    );
  }, [userTasks]);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar */}
      {user && (
        <ProfileSidebar user={user} activeTasksCount={incomplete.length} />
      )}

      {/* Right Content Area */}
      <div className="flex-1">
        <div>
          {/* Task Distribution Card */}
          <TaskDistributionCard tasks={incomplete} />

          {/* Tasks List */}
          {userTasks.length > 0 ? (
            <div className="space-y-4">
              {/* Incomplete Tasks */}
              {incomplete.map((task) => (
                <AssignedTaskCard key={task._id} task={task} />
              ))}

              {/* Divider (Only shows if both sections have tasks) */}
              {incomplete.length > 0 && complete.length > 0 && (
                <div className="bg-blue-600 h-0.5 rounded-full my-4" />
              )}

              {/* Completed Tasks */}
              {complete.map((task) => (
                <AssignedTaskCard key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100 text-sm">
              No tasks assigned to this user.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}