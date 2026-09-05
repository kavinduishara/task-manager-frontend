import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import Section from "./Section";
import Avatar from "./Avatar";
import { getAllUsers } from "@/libs/api/users";
import type { TaskUser } from "@/types/task";

function AssigTimeAndUser({
  dueDate,
  setDueDate,
  assignee,
  setAssignee,
  isViewMode
}: {
  dueDate: string;
  setDueDate: (date: string) => void;
  assignee:TaskUser|undefined|null;
  setAssignee: (assignee: TaskUser) => void;
  isViewMode:boolean
}) {
  const [assignees, setAssignees] = useState<TaskUser[]>([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getAllUsers();
        setAssignees(users);
      } catch (error) {
        console.error("Fetching users failed:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleSelectAssignee = (assignee: TaskUser) => {
    setAssignee(assignee);
    setShowList(false);
  };

  return (
    <Section number={3} title="Assignment & Timeline">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Assignee */}
        <div className="relative">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Assignee
          </label>

          <button
            disabled={isViewMode}
            type="button"
            onClick={() => setShowList((prev) => !prev)}
            className="w-full flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          >
            <div className="flex items-center gap-2">
              {assignee ? (
                <>
                  <Avatar user={assignee} />
                  <span>{assignee.name}</span>
                </>
              ) : (
                <span className="text-slate-400">
                  Select an assignee
                </span>
              )}
            </div>
          </button>

          {showList && !isViewMode && (
            <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              <div className="max-h-60 overflow-y-auto py-1">
                {assignees.map((user) => {
                  const isSelected =user===assignee

                  return (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => handleSelectAssignee(user)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors ${
                        isSelected
                          ? "bg-indigo-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar user={user} />

                        <span
                          className={`text-sm ${
                            isSelected
                              ? "font-medium text-indigo-700"
                              : "text-slate-700"
                          }`}
                        >
                          {user.name}
                        </span>
                      </div>

                      {isSelected && (
                        <span className="text-indigo-600">
                          <Check size={16} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Target Due Date
          </label>

          <input
          disabled={isViewMode}
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>
    </Section>
  );
}

export default AssigTimeAndUser;