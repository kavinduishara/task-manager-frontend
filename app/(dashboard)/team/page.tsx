"use client";

import { FilterSection } from "@/components/FilterSection";
import { MetricCard } from "@/components/MetricCard";
import { UserCard } from "@/components/UserCard";
import { getTasks } from "@/libs/api/tasks";
import { getAllUsers } from "@/libs/api/users";
import { Task, TaskUser } from "@/types/task";
import { UserDetails } from "@/types/user";
import PageLoader from "@/components/PageLoader";
import { CheckCircle, Clipboard, Target, Users2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function TeamDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [activeSquad, setActiveSquad] = useState("All Squads");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [taskData, userData] = await Promise.all([getTasks(), getAllUsers()]);
        setTasks(taskData || []);
        setUsers(userData || []);
      } catch (error) {
        console.error("Fetching dashboard data failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute Task-to-User map dynamically
  const userTaskMap = useMemo(() => {
    const map = new Map<string, Task[]>();
    users.forEach((u) => map.set(u._id, []));

    tasks.forEach((task) => {
      if (task.assignee?._id && map.has(task.assignee._id)) {
        map.get(task.assignee._id)?.push(task);
      }
    });
    return map;
  }, [tasks, users]);

  // Dynamic Metrics Calculation
  const metrics = useMemo(() => {
    const totalMembers = users.length;
    const activeTasks = tasks.filter((t) => t.status !== "DONE").length;
    const completedTasks = tasks.filter((t) => t.status === "DONE").length;

    return {
      totalMembers,
      activeTasks,
      completedTasks,
    };
  }, [users, tasks]);

  // Search/Filter Users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [users, searchQuery]);

  if (isLoading) {
    return <PageLoader label="Loading team data..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Members"
          value={metrics.totalMembers.toString()}
          subtext="Active Seats"
          icon=<Users2/>
        />
        <MetricCard
          title="Active Tasks"
          value={metrics.activeTasks.toString()}
          subtext="In Progress"
          badge="Capacity load dynamic"
          icon=<Clipboard/>
        />
        <MetricCard
          title="Completed"
          value={metrics.completedTasks.toString()}
          subtext="Total Done"
          icon=<CheckCircle/>
        />
      </div>

      {/* Filter Section */}
      <FilterSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        activeSquad={activeSquad}
        setActiveSquad={setActiveSquad}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Grid or List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              assignedTasks={userTaskMap.get(user._id) || []}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100">
          {filteredUsers.map((user) => {
            const userTasks = userTaskMap.get(user._id) || [];
            return (
              <div key={user._id} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{user.name}</h4>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {userTasks.length} Active Tasks
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}