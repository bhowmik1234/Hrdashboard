import { create } from 'zustand'
import { User } from '@/types'

interface BookmarksState {
  bookmarks: User[]
  toggleBookmark: (user: User) => void
  removeBookmark: (id: number) => void
}

export const useBookmarks = create<BookmarksState>((set, get) => ({
  bookmarks: [],
  toggleBookmark: (user) => {
    const { bookmarks } = get()
    const exists = bookmarks.some((b) => b.id === user.id)
    if (exists) {
      set({ bookmarks: bookmarks.filter((b) => b.id !== user.id) })
    } else {
      set({ bookmarks: [...bookmarks, user] })
    }
  },
  removeBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    }))
  },
}))
