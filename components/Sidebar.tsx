'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, BarChart, User, Bookmark } from 'lucide-react'
import { signIn, useSession } from "next-auth/react";

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home, protected: false },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark, protected: true },
  { name: 'Analytics', href: '/analytics', icon: BarChart, protected: true },
  { name: 'Create User', href: '/create-user', icon: User, protected: true },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleProtectedRoute = (e: React.MouseEvent, href: string, isProtected: boolean) => {
    if (isProtected && !session) {
      e.preventDefault()
      signIn("google") 
    }
  }

  return (
    <div className="fixed py-24 left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 shadow-2xl z-40">
      <nav className="mt-8 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleProtectedRoute(e, item.href, item.protected)}
              className={`
                group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-102'
                }
              `}
            >
              <Icon 
                size={20} 
                className={`
                  transition-all duration-300
                  ${isActive ? 'text-white drop-shadow-sm' : 'group-hover:text-blue-400'}
                `} 
              />
              <span className="font-medium tracking-wide">{item.name}</span>
              {isActive && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
