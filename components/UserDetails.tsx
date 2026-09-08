import { useRouter } from "next/navigation";

import { ArrowRight, CheckSquare, LogOut, User } from "lucide-react";
import UserHeader from "./UserHeader";
import UserStats from "./UserStats";
import { logout } from "@/libs/api/auth";
import { useEffect, useState } from "react";
import { getMyTasks } from "@/libs/api/users";
import type { UserDetails } from '@/types/user';
import { Task } from "@/types/task";
import { useUserDetails } from "./providers/UserDetailsProvider";
import { useNotification } from "./providers/NotificationProvider";
import axios from "axios";



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
  const router = useRouter();

    const { user }=useUserDetails()
    const { showNotification } = useNotification();
    
  

  const handleLogout = async () => {
    try {
      const data=await logout();

      showNotification(data.message,"success");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      if (axios.isAxiosError(error)) {
          showNotification(
          error.response?.data?.message ??
          "Failed to logout","error"
          );
      } else {
          showNotification("Failed to logout.","error");
      }
    }
  };
  const [tasks,setTasks]=useState<Task[]>([])

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMyTasks();
        setTasks(details);
      } catch (error) {
        console.error("Fetching tasks failed:", error);
      }
    };

    fetchDetails();
  }, []);
  
  return (
    <div className="absolute top-17 right-5 z-50 w-72 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      
        <UserHeader user={user}   />

        <UserStats
            completedTasks={(tasks?.filter(task=>task.status==="DONE"))?.length||0}
            taskCount={tasks?.length||0}
        />


        <div className="p-2">
            <MenuItem
            icon={User}
            label="View Profile"
            onClick={() => router.push("/user")}
            >
                <ArrowRight className="h-4 w-4 text-slate-400" />
            </MenuItem>

            <div className="my-1 border-t border-slate-100" />

            <MenuItem
            icon={LogOut}
            label="Logout"
            onClick={handleLogout}
            color="text-red-600 hover:text-red-700"
            />
        </div>
    </div>
  );
}

export default UserDetails;
