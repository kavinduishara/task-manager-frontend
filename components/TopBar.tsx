import { LayoutDashboard, LayoutDashboardIcon, Plus, Search,User2, Users2 } from "lucide-react";


export default function TopBar() {
  return (
    <div className="w-full bg-white">
      <div className="flex items-center h-16 px-6 border-b border-gray-200 justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-blue-100 rounded-lg px-3 py-2">
            <LayoutDashboard size={16} />
            <span>Boards</span>
          </button>
          
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-blue-100 rounded-lg px-3 py-2">
            <Users2 size={16} />
            <span>Team</span>
          </button>
          
        </div>

        <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search tasks, boards..."
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition"
            />
        </div>
          
        <div className="flex items-center gap-2 w-56 justify-end shrink-0">

          <button className="flex items-center gap-2 text-sm font-bold text-white bg-blue-900 rounded-lg px-3 py-2">
            <Plus size={16} />
            <span>Add Card</span>
          </button>
          
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-medium ml-1">
            <User2/>
          </div>

        </div>

      </div>
    </div>
  );
}