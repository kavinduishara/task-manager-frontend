import Avatar from "./Avatar";
import type { UserDetails } from '@/types/user';


function UserHeader({user}:{user:UserDetails|null}) {
  return (
    <div className="p-4 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <Avatar
          user={user}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">
              {user?.name}
            </span>

            <span className="text-[10px] font-medium text-red-600 bg-red-50 rounded-full px-2 py-0.5">
              {user?.role}
            </span>
          </div>

          <div className="text-xs text-slate-500 truncate">
            {user?.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
