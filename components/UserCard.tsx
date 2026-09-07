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
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <Avatar user={user} size={12}/>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
              {user.role}
            </span>
            <button className="text-gray-400 hover:text-gray-600">⋮</button>
          </div>
        </div>

        {/* User Information */}
        <h3 className="font-bold text-gray-900 text-base">{user.name}</h3>
        <p className="text-xs text-gray-400 mb-4">{user.email}</p>

        {/* Task Progress Load */}
        <div className="bg-gray-50 p-3 rounded-xl mb-4">
          <div className="flex justify-between text-xs font-medium mb-1.5">
            <span className="text-gray-500">Active Load</span>
            <span className="font-bold text-gray-800">{activeTasksCount} Tasks</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${loadPercentage}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};