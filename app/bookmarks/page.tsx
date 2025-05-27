'use client'

import React from 'react'
import { useBookmarks } from '@/store/useBookmarks'
import { Card } from '@/components/Card'
import { useRouter } from 'next/navigation'

const BookmarksPage: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmarks()
  const router = useRouter() 

  if (bookmarks.length === 0)
    return (
      <p className="p-8 text-center dark:text-gray-400">
        No bookmarked employees yet.
      </p>
    )

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold dark:text-white">Bookmarked Employees</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {bookmarks.map((user) => (
          <Card
            key={user.id}
            user={user}
            isBookmarked={true}
            onBookmark={() => removeBookmark(user.id)}
            onPromote={() => alert(`Promoted ${user.firstName}!`)}
            onView={() => router.push(`/employee/${user.id}`)} 
          />
        ))}
      </div>
    </main>
  )
}

export default BookmarksPage
