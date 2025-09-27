import { create } from 'zustand'
import dayjs from 'dayjs'

interface GlobalState {
  selectedMonth: string
  setSelectedMonth: (month: string) => void
  selectedAccount: string | null
  setSelectedAccount: (account: string | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  selectedMonth: dayjs().format('YYYY-MM'),
  setSelectedMonth: (month: string) => set({ selectedMonth: month }),
  
  selectedAccount: null,
  setSelectedAccount: (account: string | null) => set({ selectedAccount: account }),
  
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}))
