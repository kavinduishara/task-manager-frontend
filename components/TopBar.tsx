'use client' // 1. Mark as a Client Component to use hooks

import Link from 'next/link'
import { usePathname } from 'next/navigation' // 2. Import usePathname
import { LayoutDashboard, Plus, Search, User2, Users2 } from "lucide-react";

export default function TopBar() {
  const pathname = usePathname() // 3. Get the current active path

  // 4. Helper function to apply dynamic styles
  const getLinkStyle = (path: string) => {
    const isActive = pathname === path
    return `flex items-center gap-2 text-sm font-semibold rounded-lg px-3 py-2 transition-colors ${
      isActive 
        ? 'text-blue-700 bg-blue-100 font-bold' // Styles for the Active link
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' // Styles for Inactive links
    }`
  }

  return (
    <div className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center h-16 px-6 border-b border-gray-200 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className={getLinkStyle('/')}>
            <LayoutDashboard size={16} />
            <span>Boards</span>
          </Link>

          <Link href="/team" className={getLinkStyle('/team')}>
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
            type="text"
            placeholder="Search tasks, boards..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition"
          />
        </div>
          
        <div className="flex items-center gap-2 w-56 justify-end shrink-0">
          <Link href="/newtask" className="flex items-center gap-2 text-sm font-bold text-white bg-blue-900 rounded-lg px-3 py-2">
            <Plus size={16} />
            <span>Add Card</span>
          </Link>
          
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-medium ml-1">
            <User2 size={16}/>
          </div>
        </div>

      </div>
    </div>
  );
}
