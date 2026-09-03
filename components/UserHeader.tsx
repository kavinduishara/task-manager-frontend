import React from "react";
import Avatar from "./Avatar";

function UserHeader() {
  return (
    <div className="p-4 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <Avatar
          user={{
            name: "John Doe",
            profilePicture:
              "https://randomuser.me/api/portraits/women/2.jpg",
          }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">
              John Doe
            </span>

            <span className="text-[10px] font-medium text-red-600 bg-red-50 rounded-full px-2 py-0.5">
              Admin
            </span>
          </div>

          <div className="text-xs text-slate-500 truncate">
            john.doe@example.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
