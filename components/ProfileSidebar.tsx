"use client";

import Avatar from "./Avatar";
import { UserDetails } from "@/types/user";

interface ProfileSidebarProps {
  user: UserDetails;
  activeTasksCount: number;
}

export const ProfileSidebar = ({ user, activeTasksCount }: ProfileSidebarProps) => {

  return (
    <div className="w-full lg:w-80 flex flex-col gap-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
        {/* Cover Background Header */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-indigo-50 to-blue-50" />

        {/* Avatar */}
        <div className="relative mt-6 mb-3">
          <Avatar user={user} size={20}/>
        </div>

        {/* User Info */}
        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-xs text-gray-400 mb-4">{user.email}</p>

        
      </div>

    </div>
  );
};