import { create } from 'zustand'

interface State {
  service: string | undefined
  setService: (service: string | undefined) => void
}

export const useServiceStore = create<State>((set) => ({
  service: undefined,
  setService: (service) => set({ service }),
}))
