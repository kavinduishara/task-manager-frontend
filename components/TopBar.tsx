'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation' // 2. Import usePathname
import { LayoutDashboard, Plus, Search, Users2 } from "lucide-react";
import UserDetails from './UserDetails';
import { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import { useUserDetails } from './providers/UserDetailsProvider';
import { getMyDetails } from '@/libs/api/users';

export default function TopBar() {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const topBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() // 3. Get the current active path

  const { user,setUser }=useUserDetails()
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!topBarRef.current?.contains(event.target as Node)) {
        setShowUserDetails(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMyDetails();

        setUser(details.user);
      } catch (error) {
        console.error("Fetching tasks failed:", error);
      }
    };

    fetchDetails();
  }, []);

  const getLinkStyle = (path: string) => {
    const isActive = pathname === path
    return `flex items-center gap-2 text-sm font-semibold rounded-lg px-3 py-2 transition-colors ${
      isActive 
        ? 'text-blue-700 bg-blue-100 font-bold' // Styles for the Active link
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' // Styles for Inactive links
    }`
  }


  return (
    <div ref={topBarRef} className="w-full bg-white sticky top-0 z-30 shadow-sm">
      <div className="flex items-center h-16 px-6 border-b border-gray-200 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" onClick={() => setShowUserDetails(false)} className={getLinkStyle('/')}>
            <LayoutDashboard size={16} />
            <span>Boards</span>
          </Link>

          <Link href="/team" onClick={() => setShowUserDetails(false)} className={getLinkStyle('/team')}>
            <Users2 size={16} />
            <span>Team</span>
          </Link>
        </div>

        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            onFocus={() => setShowUserDetails(false)}
            type="text"
            placeholder="Search tasks, boards..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition"
          />
        </div>
          
        <div className="flex items-center gap-2 w-56 justify-end shrink-0">
          <Link href="/task" onClick={() => setShowUserDetails(false)} className="flex items-center gap-2 text-sm font-bold text-white bg-blue-900 rounded-lg px-3 py-2">
            <Plus size={16} />
            <span>Add Card</span>
          </Link>
          
          <div className="w-9 h-9 rounded-fullflex items-center justify-center" onClick={()=>setShowUserDetails(!showUserDetails)}>
            <Avatar user={user} size={9}/>
          </div>
        </div>

        {showUserDetails && <UserDetails />}

      </div>
    </div>
  );
}
