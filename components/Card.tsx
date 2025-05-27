import React from 'react'
import { User } from '@/types'
import { signIn, signOut, useSession } from "next-auth/react";


interface CardProps {
  user: User
  onView: () => void
  onBookmark: () => void
  onPromote: () => void
  isBookmarked: boolean
}

export const Card: React.FC<CardProps> = ({
  user,
  onView,
  onBookmark,
  onPromote,
  isBookmarked,
}) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }




  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600">
      {/* Bookmark Button */}
      <button
        onClick={onBookmark}
        className="absolute top-3 bg-gray-900 m-px right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 z-10"
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <svg
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
            isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-400 hover:text-yellow-500'
          }`}
          fill={isBookmarked ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>

      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {user.image ? (
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-800"
            />
          ) : (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm sm:text-lg shadow-lg">
              {getInitials(user.firstName, user.lastName)}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-5 sm:h-5 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 truncate">
            {user.company.department}
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-1 sm:space-y-0 sm:space-x-3 text-xs sm:text-sm">
            <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Age {user.age}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          onClick={onView}
          className="flex-1 px-3 sm:px-4 py-2 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200 font-medium text-xs sm:text-sm flex items-center justify-center space-x-2"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>View Profile</span>
        </button>
        <button
          onClick={onPromote}
          className="flex-1 px-3 sm:px-4 py-2 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200 font-medium text-xs sm:text-sm flex items-center justify-center space-x-2"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Promote</span>
        </button>
      </div>
    </div>
  )
}