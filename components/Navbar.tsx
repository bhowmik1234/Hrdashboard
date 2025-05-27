'use client'

import { Bell } from 'lucide-react'
import { signIn, signOut, useSession } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { data: session } = useSession()
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleSignIn = () => signIn("google")
  const handleSignOut = () => {signOut(); router.push('/')}

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="bg-gray-900 backdrop-blur-lg border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* Logo Section */}
        <div className="px-4 py-1 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            MyApp
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-emerald-700 font-medium">Online</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all duration-200 hover:shadow-md">
            <Bell size={18} className="text-slate-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              3
            </span>
          </button>

          {/* Profile & Logout */}
          {session?.user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(prev => !prev)}
                className="flex items-center space-x-3 p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <img className="h-8 w-8 rounded-full" src={session.user.image!} alt="User Image" />
                <span className="hidden sm:block text-white font-medium text-sm">Profile</span>
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg z-50 p-4 space-y-2">
                  <div className="text-sm text-gray-300 font-medium">{session.user.name}</div>
                  <div className="text-xs text-gray-500 overflow-hidden">{session.user.email}</div>
                  <hr className="my-2" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 rounded-md bg-red-700 text-red-100 hover:bg-red-200 text-sm font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div onClick={handleSignIn} className="text-sm/6 font-semibold text-gray-300 cursor-pointer">
              Log in <span aria-hidden="true">&rarr;</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
