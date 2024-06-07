import { create } from 'zustand'

interface State {
  price: string | undefined
  setPrice: (price: string | undefined) => void
}

export const usePriceStore = create<State>((set) => ({
  price: undefined,
  setPrice: (price) => set({ price }),
}))
