import { useEffect, useState } from "react";
import Section from "./Section";
import { Check } from "lucide-react";
import { getAllUsers } from "@/libs/api/users";
import { TaskUser } from "@/types/task";
import Avatar from "./Avatar";

// const assignees = [
//   {
//     name: "Alice Johnson",
//     profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
//   },
//   {
//     name: "Bob Smith",
//     profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
//   },
//   {
//     name: "Charlie Brown",
//     profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
//   },
//   {
//     name: "David Wilson",
//     profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
//   },
//   {
//     name: "Eva Davis",
//     profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
//   },
//   {
//     name: "Frank Miller",
//     profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
//   },
//   {
//     name: "Grace Lee",
//     profilePicture: "https://randomuser.me/api/portraits/women/7.jpg",
//   },
// ];

function AssigTimeAndUser({
  dueDate,
  setDueDate,
}: {
  dueDate: string;
  setDueDate: (date: string) => void;
}) {
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [showList, setShowList] = useState(false);
  const [assignees,setAssignees]=useState<TaskUser[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const users = await getAllUsers();
        setAssignees(users)
      } catch (error) {
        console.error("Fetching tasks failed:", error);
      }
    };

    fetchTasks();
  }, []);

  const selectedUser = assignees.find(
    (assignee) => assignee.name === selectedAssignee
  );

  return (
    <Section number={3} title="Assignment & Timeline">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Assignee */}
        <div className="relative">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Assignee
          </label>

          {/* Selector */}
          <button
            type="button"
            onClick={() => setShowList((prev) => !prev)}
            className="w-full flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          >
            <div className="flex items-center gap-2">
              {selectedUser ? (
                <>
                  <Avatar user={selectedUser}/>

                  <span>{selectedUser.name}</span>
                </>
              ) : (
                <span className="text-slate-400">
                  Select an assignee
                </span>
              )}
            </div>
          </button>

          {/* Dropdown */}
          {showList && (
            <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden">
              <div className="max-h-60 overflow-y-auto py-1">
                {assignees.map((assignee) => {
                  const isSelected =
                    selectedAssignee === assignee.name;

                  return (
                    <button
                      key={assignee.name}
                      type="button"
                      onClick={() => {
                        setSelectedAssignee(assignee.name);
                        setShowList(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors ${
                        isSelected
                          ? "bg-indigo-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">

                        <Avatar user={assignee}/>

                        <span
                          className={`text-sm ${
                            isSelected
                              ? "text-indigo-700 font-medium"
                              : "text-slate-700"
                          }`}
                        >
                          {assignee.name}
                        </span>
                      </div>

                      {isSelected && (
                        <span className="text-indigo-600 text-sm">
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
            type="date"
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
