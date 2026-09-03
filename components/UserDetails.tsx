import { ArrowRight, CheckSquare, LogOut, User } from "lucide-react";
import UserHeader from "./UserHeader";
import UserStats from "./UserStats";

function MenuItem({ icon: Icon, label, onClick,children,color }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick?: () => void; children?: React.ReactNode; color?: string }) {
  return (
    <button
        type="button"
        onClick={onClick}
        className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm ${color || "text-slate-600"} hover:bg-slate-50 transition-colors`}
      > 

        <div className="flex items-center gap-3">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </div>
        {children && <div className="ml-2">{children}</div>}
        
    </button>
  );
}

function UserDetails() {
  return (
    <div className="absolute top-17 right-5 z-50 w-72 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      
        <UserHeader />

        <UserStats
            completedTasks={7}
            taskCount={10}
        />


        <div className="p-2">
            <MenuItem
            icon={User}
            label="View Profile"
            onClick={() => console.log("View Profile clicked")}
            >
                <ArrowRight className="h-4 w-4 text-slate-400" />
            </MenuItem>


            <MenuItem
            icon={CheckSquare}
            label="My Assigned Tasks"
            onClick={() => console.log("My Assigned Tasks clicked")}
            >
                <span className="text-xs font-medium bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
                5
                </span>
            </MenuItem>
            <div className="my-1 border-t border-slate-100" />

            <MenuItem
            icon={LogOut}
            label="Logout"
            onClick={() => console.log("Logout clicked")}
            color="text-red-600 hover:text-red-700"
            />
        </div>
    </div>
  );
}

export default UserDetails;
