import { format } from 'date-fns'
import { create } from 'zustand'

interface State {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  formattedDate: string | undefined
}

export const useDateStore = create<State>((set) => ({
  date: undefined,
  setDate: (date) => {
    set({ date })
    set(() => ({
      formattedDate: date ? format(date, 'dd-MM-yyyy') : undefined,
    }))
  },
  formattedDate: undefined,
}))
