import type { Theme } from '../types/theme'
import { create } from 'zustand'

type HeaderDraft = {
  title?: string
  description?: string
}

interface DesignState {
  headerDraft: HeaderDraft
  themeDraft: Theme | null

  setHeaderDraft: (diff: HeaderDraft) => void
  resetHeaderDraft: () => void

  setThemeDraft: (theme: Theme) => void
  resetThemeDraft: () => void
}

export const useDesignStore = create<DesignState>((set) => ({
  headerDraft: {},
  themeDraft: null,

  setHeaderDraft: (diff) =>
    set((state) => ({ headerDraft: { ...state.headerDraft, ...diff } })),
  resetHeaderDraft: () => set({ headerDraft: {} }),

  setThemeDraft: (theme) => set({ themeDraft: theme }),
  resetThemeDraft: () => set({ themeDraft: null }),
}))
