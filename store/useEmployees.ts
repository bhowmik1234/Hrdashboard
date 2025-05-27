import {create} from 'zustand'
import { User } from '@/types'
import { fetchUserById } from '@/lib/fetchUsers'

interface EmployeesState {
  employees: User[]
  loading: boolean
  error: string | null
  fetchAllEmployees: () => Promise<void>
  addEmployee: (user: User) => void
}

export const useEmployees = create<EmployeesState>((set, get) => ({
  employees: [],
  loading: false,
  error: null,
  fetchAllEmployees: async () => {
    if (get().employees.length > 0) return
    set({ loading: true, error: null })
    try {
      const users = await fetchUserById('all')
      set({ employees: users, loading: false })
    } catch {
      set({ error: 'Failed to fetch employees', loading: false })
    }
  },
  addEmployee: (user: User) => {
    console.log('Adding employees 34:', user)
    set((state) => ({
      employees: [...state.employees, user],
    }))
    console.log('Updated employees:', get().employees)
  },
}))


