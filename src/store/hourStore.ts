import { create } from 'zustand'

interface State {
  hour: string | undefined
  setHour: (hours: string | undefined) => void
}

export const useHourStore = create<State>((set) => ({
  hour: undefined,
  setHour: (hour) => set({ hour }),
}))
