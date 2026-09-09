import { Task, TaskUser } from "@/types/task";
import Avatar from "./Avatar";
import { UserDetails } from "@/types/user";

interface UserCardProps {
  user: UserDetails;
  assignedTasks: Task[];
}

export const UserCard = ({ user, assignedTasks }: UserCardProps) => {
  const activeTasksCount = assignedTasks.filter((t) => t.status !== "DONE").length;

  const loadPercentage = Math.min(Math.round((activeTasksCount / 5) * 100), 100);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
      <div>
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <Avatar user={user} size={12} />

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold capitalize text-indigo-600">
              {user.role}
            </span>
            <button className="rounded-full px-1.5 text-lg leading-none text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              ⋮
            </button>
          </div>
        </div>

        {/* User Information */}
        <h3 className="text-base font-bold text-gray-900">{user.name}</h3>
        <p className="mb-4 truncate text-xs text-gray-400">{user.email}</p>

        {/* Task Progress Load */}
        <div className="mb-1 rounded-xl border border-gray-100 bg-gray-50 p-3">
          <div className="mb-1.5 flex justify-between text-xs font-medium">
            <span className="text-gray-500">Active Load</span>
            <span className="font-bold text-gray-800">{activeTasksCount} Tasks</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-indigo-500 transition-all duration-300" style={{ width: `${loadPercentage}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
