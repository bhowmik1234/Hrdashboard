import {create} from 'zustand'

interface SearchState {
  query: string
  departmentFilters: string[]
  ratingFilter: number | null
  setQuery: (q: string) => void
  setDepartmentFilters: (d: string[]) => void
  setRatingFilter: (r: number | null) => void
}

export const useSearch = create<SearchState>((set) => ({
  query: '',
  departmentFilters: [],
  ratingFilter: null,
  setQuery: (q) => set({ query: q }),
  setDepartmentFilters: (d) => set({ departmentFilters: d }),
  setRatingFilter: (r) => set({ ratingFilter: r }),
}))
